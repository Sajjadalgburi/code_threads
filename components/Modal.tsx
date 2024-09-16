/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { Modal, ModalBody, ModalTrigger } from "./ui/animated-modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ThreadForm from "./ThreadForm";

export function DefaultModal({ action }: { action: string }) {
  const { data: session } = useSession();

  return (
    <div className="py-40 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="text-center">
            {action === "create" ? "Create" : "Edit"}
          </span>
        </ModalTrigger>
        <ModalBody>
          {/* Title */}
          <h3 className="text-sm md:text-xl capitalize text-neutral-600 dark:text-neutral-100 font-bold text-center mb-3">
            {action === "create" ? "New Thread" : "Edit Thread"}
          </h3>

          {/* Body */}
          <div className="flex flex-col justify-center gap-4">
            <div className="flex justify-right items-center gap-3">
              <Image
                src={session?.user?.image as string}
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-md dark:text-white font-semibold">
                {session?.user?.name}
              </p>
            </div>
            <ThreadForm action={action} />{" "}
            {/* Pass data to ThreadForm if needed */}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
