'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { buttonVariants } from './ui/button';
import { useMedical } from '@/lib/MedicalProvider';

const DEFAULT_VIDEO_URL = 'https://www.youtube.com/embed/oGeh4gkXAWo?si=SY0ZDdOvg5JT9O3s';

const VideoProfilePopup = () => {
  const { settings } = useMedical();
  const videoUrl = settings.video_profile_url || DEFAULT_VIDEO_URL;

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: 'white' })}>
        <Image src="/play.svg" alt="icon" width={24} height={24} className='mr-2' />
        <label className="bold-16 whitespace-nowrap cursor-pointer">Video Profile</label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">Video Profile</AlertDialogTitle>
          <AlertDialogDescription>
            <iframe
              className="w-full aspect-video"
              src={videoUrl}
              title="Profile Ewan Jaya Kastara"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VideoProfilePopup;
