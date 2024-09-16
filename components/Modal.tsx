"use client";
import React from "react";
import { Modal, ModalBody, ModalTrigger } from "./ui/animated-modal";
import { useSession } from "next-auth/react";
import Image from "next/image";

export function AnimatedModal() {
  const { data: session } = useSession();

  return (
    <div className="py-40  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="text-center">Create</span>
        </ModalTrigger>
        <ModalBody>
          {/* Title */}
          <h3 className="text-sm md:text-xl capitalize text-neutral-600 dark:text-neutral-100 font-bold text-center mb-3">
            New Thread
          </h3>

          {/* Body */}
          <div className="flex justify-start items-center gap-4">
            <Image
              src={session?.user?.image as string}
              alt="profile picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm dark:text-white font-semibold">
                {session?.user?.name}
              </p>
              <input type="text" />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-between items-end mt-14">
            <div className="flex justify-start">
              <p className="text-gray-600 text-sm">Anyone can reply...</p>
            </div>{" "}
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-red-500 text-white dark:bg-red-500 dark:border-red-500 border border-red-500 rounded-md text-sm w-28">
                Cancel
              </button>
              <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Post
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
