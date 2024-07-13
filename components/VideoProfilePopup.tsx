'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';

const VideoProfilePopup = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="btn_white_text flexCenter gap-3 rounded-full border hover:cursor-pointer">
        <Image src="/play.svg" alt="icon" width={24} height={24} />
        <label className="bold-16 whitespace-nowrap cursor-pointer">Video Profile</label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/oGeh4gkXAWo?si=SY0ZDdOvg5JT9O3s"
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
