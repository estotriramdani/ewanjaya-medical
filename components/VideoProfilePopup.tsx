'use client';

import React, { useState } from 'react';
import {
  VideoModal,
  VideoModalContent,
  VideoModalTitle,
  VideoModalTrigger,
} from '@/components/VideoModal';
import Image from 'next/image';
import { useMedical } from '@/lib/MedicalProvider';

const DEFAULT_VIDEO_URL = 'https://www.youtube.com/embed/oGeh4gkXAWo?si=SY0ZDdOvg5JT9O3s';

function extractVideoId(url: string): string | null {
  const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const youtuMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuMatch) return youtuMatch[1];
  return null;
}

interface VideoProfilePopupProps {
  className?: string;
}

const VideoProfilePopup = ({ className = '' }: VideoProfilePopupProps) => {
  const { settings } = useMedical();
  const videoUrl = settings.video_profile_url || DEFAULT_VIDEO_URL;
  const videoId = extractVideoId(videoUrl);
  const [imgSrc, setImgSrc] = useState(
    videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ''
  );

  if (!videoId) return null;

  return (
    <VideoModal>
      <VideoModalTrigger asChild>
        <button
          className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl shadow-xl ${className}`}
        >
          <Image
            src={imgSrc}
            alt="Video Profile Thumbnail"
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 shadow-lg ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1 h-7 w-7"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <p className="text-sm font-medium text-white/90">Video Profile</p>
            <p className="text-base font-bold text-white">PT Ewan Jaya Kastara</p>
          </div>
        </button>
      </VideoModalTrigger>
      <VideoModalContent>
        <VideoModalTitle>Video Profile PT Ewan Jaya Kastara</VideoModalTitle>
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={videoUrl}
            title="Profile Ewan Jaya Kastara"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </VideoModalContent>
    </VideoModal>
  );
};

export default VideoProfilePopup;
