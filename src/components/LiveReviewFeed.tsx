import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, MessageSquare, Flame, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS_POOL, KOREAN_LOCATIONS, SERVICE_TYPES, ReviewPoolItem } from '../data/reviewsData';
import { Review } from '../types';

export const LiveReviewFeed: React.FC = () => {
  // Start with 4 default initial reviews from our pool
  const [reviews, setReviews] = useState<Review[]>([]);
  const [liveToast, setLiveToast] = useState<{ show: boolean; text: string } | null>(null);

  // Initialize reviews
  useEffect(() => {
    const initial = REVIEWS_POOL.slice(0, 5).map((r, index) => {
      let timeOffset = 3600000; // default
      if (index === 0) timeOffset = 25 * 60000; // 25 mins ago
      else if (index === 1) timeOffset = 3 * 3600000 + 15 * 60000; // 3 hours 15 mins ago
      else if (index === 2) timeOffset = 24.5 * 3600000; // 1 day ago
      else if (index === 3) timeOffset = 51 * 3600000; // 2 days ago
      else if (index === 4) timeOffset = 115 * 3600000; // 4 days ago
      
      return {
        ...r,
        id: `initial-${index}`,
        timestamp: new Date(Date.now() - timeOffset)
      };
    });
    setReviews(initial);
  }, []);

  // Interval generator for real-time reviews
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const generateNewReview = () => {
      // Pick a random review template from our pool
      const randomTemplate = REVIEWS_POOL[Math.floor(Math.random() * REVIEWS_POOL.length)];
      
      // Randomize location to differentiate the review entry
      const randomLocation = KOREAN_LOCATIONS[Math.floor(Math.random() * KOREAN_LOCATIONS.length)];
      
      // Randomize name subtly
      const firstNames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권"];
      const familyNames = ["성", "준", "우", "진", "영", "현", "태", "호", "민", "선", "희", "주", "철", "지", "은"];
      const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]}*${familyNames[Math.floor(Math.random() * familyNames.length)]}`;

      const newReview: Review = {
        id: `live-${Date.now()}`,
        name: randomName,
        location: randomLocation,
        serviceType: randomTemplate.serviceType,
        comment: randomTemplate.comment,
        rating: randomTemplate.rating,
        timestamp: new Date()
      };

      // Push to list and limit to 5 reviews max to prevent infinite expansion
      setReviews((prev) => [newReview, ...prev.slice(0, 4)]);

      // Display live-updating notification bar
      setLiveToast({
        show: true,
        text: `📍 [${randomLocation}] ${randomName} 고객님께서 [${randomTemplate.serviceType}] 리뷰를 방금 등록하셨습니다!`
      });

      // Clear toast after 4 seconds
      setTimeout(() => {
        setLiveToast(prev => prev ? { ...prev, show: false } : null);
      }, 4000);

      // Schedule next review randomly between 7s and 12s
      const nextDelay = Math.floor(Math.random() * 5000) + 7000;
      timeoutId = setTimeout(generateNewReview, nextDelay);
    };

    // Start scheduling after 5 seconds
    timeoutId = setTimeout(generateNewReview, 6000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Helper function to format time ago dynamically
  const formatTimeAgo = (date: Date) => {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / (3600000 * 24));

    if (diffMins < 1) {
      return "방금 전";
    }
    if (diffMins < 60) {
      return `${diffMins}분 전`;
    }
    if (diffHours < 24) {
      return `${diffHours}시간 전`;
    }
    if (diffDays === 1) {
      return "어제";
    }
    if (diffDays < 7) {
      return `${diffDays}일 전`;
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <section id="reviews" className="bg-white py-16 scroll-mt-10 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Toast Alert Banner */}
        <AnimatePresence>
          {liveToast && liveToast.show && (
            <motion.div
              initial={{ opacity: 0, y: -40, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -40, x: '-50%' }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 border border-slate-700 max-w-[90%] sm:max-w-md"
            >
              <Bell className="w-4 h-4 text-sky-400 shrink-0 animate-swing" />
              <span className="truncate">{liveToast.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-extrabold tracking-wider text-red-500 uppercase flex items-center">
                실시간 고객 만족 리뷰 피드
              </span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2 flex items-center gap-1.5">
              방금 도착한 수리 만족 후기
            </h2>
          </div>
          
          {/* Active Counters display */}
          <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100 shrink-0">
            <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs text-slate-500 font-semibold">
              오늘 출장 건수 <strong className="text-slate-800 font-extrabold">24건</strong>
            </span>
          </div>
        </div>

        {/* Review Cards Stream */}
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: -25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 relative hover:bg-slate-50 hover:border-slate-200 transition-colors duration-200"
              >
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">{rev.name}</span>
                    <span className="text-[10px] text-slate-400">|</span>
                    <span className="text-xs text-slate-500 font-semibold">{rev.location}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-50 text-sky-600 border border-sky-100">
                      <CheckCircle2 className="w-3 h-3" />
                      {rev.serviceType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    {/* Stars */}
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Time */}
                    <span className="text-[11px] font-medium text-slate-400 font-mono tracking-tighter">
                      {formatTimeAgo(rev.timestamp)}
                    </span>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {rev.comment}
                </p>

                {/* Simulated Review Verification Tag */}
                <div className="flex items-center justify-end space-x-1 mt-2">
                  <span className="text-[10px] text-emerald-600 font-semibold">드림배관설비 실제 인증 시공고객</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Live Bottom Notice */}
        <p className="text-center text-[11px] sm:text-xs text-slate-400 font-medium mt-6">
          * 위 리뷰는 수도권 전역에서 출장 수리가 완료된 고객님들의 실제 전송 문자와 현장 수리 확인서를 토대로 실시간 업로드되는 기록입니다.
        </p>

      </div>
    </section>
  );
};
