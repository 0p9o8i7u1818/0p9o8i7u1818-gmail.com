import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, Tag, Filter, MapPin, Calendar, PlusCircle, X, ShieldAlert } from 'lucide-react';
import { ConstructionCase } from '../types';
import { INITIAL_CASES } from '../data/casesData';

const CATEGORIES = ["전체", "배관 막힘", "배관관리", "고압세척", "펌프교환", "수전교체", "동파/해빙"];

interface ConstructionBoardProps {
  isAdmin?: boolean;
}

export const ConstructionBoard: React.FC<ConstructionBoardProps> = ({ isAdmin = false }) => {
  const [cases, setCases] = useState<ConstructionCase[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  
  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("배관 막힘");
  const [formDescription, setFormDescription] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formTags, setFormTags] = useState("");
  const [beforeImage, setBeforeImage] = useState<string>("");
  const [afterImage, setAfterImage] = useState<string>("");
  
  // File drag states
  const [isDragBefore, setIsDragBefore] = useState(false);
  const [isDragAfter, setIsDragAfter] = useState(false);

  // Edit State for admin photograph/meta changes
  const [editingCase, setEditingCase] = useState<ConstructionCase | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("배관 막힘");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editBeforeImage, setEditBeforeImage] = useState("");
  const [editAfterImage, setEditAfterImage] = useState("");
  const [isDragEditBefore, setIsDragEditBefore] = useState(false);
  const [isDragEditAfter, setIsDragEditAfter] = useState(false);


  // Load from localstorage or load initial
  useEffect(() => {
    const saved = localStorage.getItem('dream_plumbing_cases');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ConstructionCase[];
        const existingIds = new Set(parsed.map(c => c.id));
        const missingDefaults = INITIAL_CASES.filter(c => !existingIds.has(c.id));
        if (missingDefaults.length > 0) {
          const merged = [...parsed, ...missingDefaults];
          setCases(merged);
          localStorage.setItem('dream_plumbing_cases', JSON.stringify(merged));
        } else {
          setCases(parsed);
        }
      } catch (e) {
        setCases(INITIAL_CASES);
      }
    } else {
      setCases(INITIAL_CASES);
      localStorage.setItem('dream_plumbing_cases', JSON.stringify(INITIAL_CASES));
    }
  }, []);

  const saveCases = (updated: ConstructionCase[]) => {
    setCases(updated);
    localStorage.setItem('dream_plumbing_cases', JSON.stringify(updated));
  };

  const handleStartEdit = (cs: ConstructionCase) => {
    setEditingCase(cs);
    setEditTitle(cs.title);
    setEditCategory(cs.category);
    setEditDescription(cs.description);
    setEditLocation(cs.location);
    setEditTags(cs.tags.join(', '));
    setEditBeforeImage(cs.beforeImage);
    setEditAfterImage(cs.afterImage);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') {
          setEditBeforeImage(reader.result as string);
        } else {
          setEditAfterImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditDragOver = (e: React.DragEvent, type: 'before' | 'after') => {
    e.preventDefault();
    if (type === 'before') setIsDragEditBefore(true);
    else setIsDragEditAfter(true);
  };

  const handleEditDragLeave = (type: 'before' | 'after') => {
    if (type === 'before') setIsDragEditBefore(false);
    else setIsDragEditAfter(false);
  };

  const handleEditDrop = (e: React.DragEvent, type: 'before' | 'after') => {
    e.preventDefault();
    handleEditDragLeave(type);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') {
          setEditBeforeImage(reader.result as string);
        } else {
          setEditAfterImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;

    if (!editTitle || !editDescription || !editLocation) {
      alert("모든 필수 항목(제목, 시공설명, 위치)을 적어주세요.");
      return;
    }

    const tagList = editTags
      ? editTags.split(',').map(t => t.trim()).filter(t => t.length > 0)
      : [editCategory, "시공기록"];

    const updated = cases.map(c => {
      if (c.id === editingCase.id) {
        return {
          ...c,
          title: editTitle,
          category: editCategory,
          description: editDescription,
          location: editLocation,
          tags: tagList,
          beforeImage: editBeforeImage,
          afterImage: editAfterImage
        };
      }
      return c;
    });

    saveCases(updated);
    setEditingCase(null);
    alert("시공 사례의 사진 및 정보 변경이 안전하게 저장되었습니다!");
  };

  // Convert File to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') {
          setBeforeImage(reader.result as string);
        } else {
          setAfterImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent, type: 'before' | 'after') => {
    e.preventDefault();
    if (type === 'before') setIsDragBefore(true);
    else setIsDragAfter(true);
  };

  const handleDragLeave = (type: 'before' | 'after') => {
    if (type === 'before') setIsDragBefore(false);
    else setIsDragAfter(false);
  };

  const handleDrop = (e: React.DragEvent, type: 'before' | 'after') => {
    e.preventDefault();
    handleDragLeave(type);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') {
          setBeforeImage(reader.result as string);
        } else {
          setAfterImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit new construction case
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formTitle || !formDescription || !formLocation) {
      alert("모든 필수 항목(제목, 시공설명, 위치)을 적어주세요.");
      return;
    }

    // Default placeholders if files are empty
    const defaultBefore = beforeImage || "https://images.unsplash.com/photo-1542013936693-8848e5744431?auto=format&fit=crop&w=600&q=80";
    const defaultAfter = afterImage || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80";

    const tagList = formTags
      ? formTags.split(',').map(t => t.trim()).filter(t => t.length > 0)
      : [formCategory, "시공기록"];

    const newCase: ConstructionCase = {
      id: `case-user-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      description: formDescription,
      beforeImage: defaultBefore,
      afterImage: defaultAfter,
      location: formLocation,
      date: new Date().toISOString().split('T')[0],
      tags: tagList
    };

    const updated = [newCase, ...cases];
    saveCases(updated);

    // Reset Form
    setFormTitle("");
    setFormCategory("배관 막힘");
    setFormDescription("");
    setFormLocation("");
    setFormTags("");
    setBeforeImage("");
    setAfterImage("");
    setShowAddModal(false);
  };

  // Delete self-added cases if needed
  const handleDeleteCase = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("정말로 이 시공 사례를 게시판에서 삭제하시겠습니까?")) {
      const updated = cases.filter(c => c.id !== id);
      saveCases(updated);
    }
  };

  const filteredCases = activeCategory === "전체"
    ? cases
    : cases.filter(c => c.category === activeCategory);

  return (
    <section id="gallery" className="bg-slate-100/50 py-16 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">PORTFOLIO</span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
              드림배관설비 실제 시공 일지
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              저희가 직접 수도권 전역에서 땀 흘려 해결한 배관 해결 현장을 슬라이드로 확인해보세요.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            id="add-case-btn"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-2xl transition shadow-lg shrink-0 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>시공 사진 올리기 (시공등록)</span>
          </button>
        </div>

        {/* Categories Horizontal Scroller representing Filter */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <span className="text-slate-400 text-xs font-bold flex items-center space-x-1 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>분류:</span>
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold border shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-100'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 max-w-md mx-auto">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">해당 분류의 시공 사례가 아직 없습니다</h3>
            <p className="text-xs text-slate-400 mt-1">우측 상단 [시공 사진 올리기] 버튼을 눌러 첫 번째 기록을 올려보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredCases.map((cs) => (
              <div
                key={cs.id}
                className="bg-white rounded-3xl border border-slate-150 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group h-full"
              >
                {/* Images Container - Before After Split view */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-0.5 bg-slate-200">
                    {/* Before Image */}
                    <div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-slate-100">
                      <img
                        referrerPolicy="no-referrer"
                        src={cs.beforeImage}
                        alt="시공 전"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-red-600/90 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow uppercase tracking-wide">
                        시공 전 (BEFORE)
                      </span>
                    </div>

                    {/* After Image */}
                    <div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-slate-100">
                      <img
                        referrerPolicy="no-referrer"
                        src={cs.afterImage}
                        alt="시공 후"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 bg-emerald-600/90 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow uppercase tracking-wide">
                        시공 후 (AFTER)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Text Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags & Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-[11px] font-bold text-slate-700">
                        {cs.category}
                      </span>
                      <span className="text-slate-300">|</span>
                      <div className="flex items-center text-slate-500 text-[11px] font-medium">
                        <MapPin className="w-3 h-3 text-slate-400 mr-1" />
                        <span className="truncate max-w-[130px]">{cs.location}</span>
                      </div>
                      <div className="flex items-center text-slate-500 text-[11px] font-medium ml-auto">
                        <Calendar className="w-3 h-3 text-slate-400 mr-1" />
                        <span>{cs.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-sky-600 transition duration-150 mb-3">
                      {cs.title}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {cs.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags Board */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {cs.tags.map((tg, idx) => (
                          <span key={idx} className="inline-flex items-center text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5">
                            <Tag className="w-2.5 h-2.5 text-slate-400 mr-0.5" />
                            {tg}
                          </span>
                        ))}
                      </div>

                      {/* Delete option for custom posts */}
                      {cs.id.startsWith("case-user-") && (
                        <button
                          onClick={(e) => handleDeleteCase(cs.id, e)}
                          className="text-[10px] font-bold text-red-500 hover:text-red-700 whitespace-nowrap pl-2"
                        >
                          삭제
                        </button>
                      )}
                    </div>

                    {/* Admin Edit Trigger */}
                    {isAdmin && (
                      <button
                        onClick={() => handleStartEdit(cs)}
                        className="w-full mt-3 flex items-center justify-center space-x-1 py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-[11px] font-bold text-amber-800 transition"
                      >
                        <span>✏️ 시공 사진 및 내용 수정 (관리자)</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Window for Editing Cases (Admin Mode) */}
        {editingCase && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
              
              {/* Modal Head */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">✏️</span>
                  <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900">시공 사진 및 정보 수정 (관리자 모드)</h3>
                </div>
                <button
                  onClick={() => setEditingCase(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">업종 선택 (*필수)</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    >
                      {CATEGORIES.filter(c => c !== "전체").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">위치/시설 정보 (*필수)</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 서울 마포구 상가 건물, 수원 아파트 싱크대"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">시공 게시글 제목 (*필수)</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">작업 시공 내용 상세 설명 (*필수)</label>
                  <textarea
                    required
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">태그 검색어 (쉼표로 구분)</label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 opacity-90"
                  />
                </div>

                {/* File Upload Drag Areas for editing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Before Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">시공 전 사진 변경 (드롭 또는 드래그)</label>
                    <div
                      onDragOver={(e) => handleEditDragOver(e, 'before')}
                      onDragLeave={() => handleEditDragLeave('before')}
                      onDrop={(e) => handleEditDrop(e, 'before')}
                      className={`h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition text-center cursor-pointer relative ${
                        isDragEditBefore ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {editBeforeImage ? (
                        <div className="absolute inset-0 rounded-2xl overflow-hidden group">
                          <img referrerPolicy="no-referrer" src={editBeforeImage} className="w-full h-full object-cover" alt="Before" />
                          <button
                            type="button"
                            onClick={() => setEditBeforeImage("")}
                            className="absolute top-1.5 right-1.5 bg-red-650 text-white rounded-full p-1 shadow"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-7 h-7 text-slate-400 mb-1.5" />
                          <span className="text-[11px] font-bold text-slate-700 font-sans">시공 전(Before) 새 파일 드롭</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">또는 컴퓨터에서 수동 업로드</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleEditFileChange(e, 'before')}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* After Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">시공 후 사진 변경 (드롭 또는 드래그)</label>
                    <div
                      onDragOver={(e) => handleEditDragOver(e, 'after')}
                      onDragLeave={() => handleEditDragLeave('after')}
                      onDrop={(e) => handleEditDrop(e, 'after')}
                      className={`h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition text-center cursor-pointer relative ${
                        isDragEditAfter ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {editAfterImage ? (
                        <div className="absolute inset-0 rounded-2xl overflow-hidden group">
                          <img referrerPolicy="no-referrer" src={editAfterImage} className="w-full h-full object-cover" alt="After" />
                          <button
                            type="button"
                            onClick={() => setEditAfterImage("")}
                            className="absolute top-1.5 right-1.5 bg-red-650 text-white rounded-full p-1 shadow"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-7 h-7 text-slate-400 mb-1.5" />
                          <span className="text-[11px] font-bold text-slate-700 font-sans">시공 후(After) 새 파일 드롭</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">또는 컴퓨터에서 수동 업로드</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleEditFileChange(e, 'after')}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>

                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingCase(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-bold hover:bg-slate-50 transition"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-extrabold shadow-md transition"
                  >
                    사진 및 정보 일괄수정 저장
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Modal Window for Creating Cases */}
        {showAddModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
              
              {/* Modal Head */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5 text-sky-500" />
                  <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900">시공 사례 등록 게시판</h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">업종 선택 (*필수)</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    >
                      {CATEGORIES.filter(c => c !== "전체").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">위치/시설 정보 (*필수)</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 서울 마포구 상가 건물, 수원 아파트 싱크대"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">시공 게시글 제목 (*필수)</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 주방 횡주관 역류 수리 및 깔끔한 스케일링 통수 작업"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 focus:focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">작업 시공 내용 상세 설명 (*필수)</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="작업 전 증상, 투입 도구 및 장비, 해결 과정, 최종 테스트 확인 결과를 자세히 안내해주세요."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500 focus:focus:ring-1 focus:ring-sky-500 resize-none"
                  />
                </div>

                {/* Tags (comma separated) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">태그 검색어 (쉼표로 구분)</label>
                  <input
                    type="text"
                    placeholder="예: 싱크대누수, 주방수전, 고강폭샤프트"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-slate-800 outline-none focus:border-sky-500"
                  />
                </div>

                {/* File Upload Drag Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Before Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">시공 전 사진 (기본 예시 대체 가능)</label>
                    <div
                      onDragOver={(e) => handleDragOver(e, 'before')}
                      onDragLeave={() => handleDragLeave('before')}
                      onDrop={(e) => handleDrop(e, 'before')}
                      className={`h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition text-center cursor-pointer relative ${
                        isDragBefore ? 'bg-sky-55/60 border-sky-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {beforeImage ? (
                        <div className="absolute inset-0 rounded-2xl overflow-hidden group">
                          <img referrerPolicy="no-referrer" src={beforeImage} className="w-full h-full object-cover" alt="Before" />
                          <button
                            type="button"
                            onClick={() => setBeforeImage("")}
                            className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 shadow"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-7 h-7 text-slate-400 mb-1.5" />
                          <span className="text-[11px] font-bold text-slate-700">시공 전(Before) 파일을 마우스 드롭</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">또는 클릭하여 파일찾기</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'before')}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* After Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">시공 후 사진 (기본 예시 대체 가능)</label>
                    <div
                      onDragOver={(e) => handleDragOver(e, 'after')}
                      onDragLeave={() => handleDragLeave('after')}
                      onDrop={(e) => handleDrop(e, 'after')}
                      className={`h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition text-center cursor-pointer relative ${
                        isDragAfter ? 'bg-sky-55/60 border-sky-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {afterImage ? (
                        <div className="absolute inset-0 rounded-2xl overflow-hidden group">
                          <img referrerPolicy="no-referrer" src={afterImage} className="w-full h-full object-cover" alt="After" />
                          <button
                            type="button"
                            onClick={() => setAfterImage("")}
                            className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 shadow"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-7 h-7 text-slate-400 mb-1.5" />
                          <span className="text-[11px] font-bold text-slate-700">시공 후(After) 파일을 마우스 드롭</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">또는 클릭하여 파일찾기</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'after')}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>

                </div>

                <div className="bg-amber-50 rounded-2xl p-3 border border-amber-100 text-[11px] text-amber-700 leading-snug flex items-start">
                  <ShieldAlert className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span>사진을 등록하지 않으시면, 드림배관설비의 대표적인 기본 시공 사례 사진으로 자동 연출되어 업로드됩니다.</span>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-bold hover:bg-slate-50 transition"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-sky-100 transition"
                  >
                    등록 완료하기
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
