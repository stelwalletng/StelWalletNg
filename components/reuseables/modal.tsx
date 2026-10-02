"use client"

import * as React from "react"
import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cn } from "cn"
import { AppColors } from "@/assets/app_colors"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  /** Hide the built-in floating close button, e.g. when a header already has its own. */
  showClose?: boolean
  /** Position of the built-in close button relative to the popup's top edge. */
  closePosition?: "top-center" | "top-right"
}

const closePositionClasses: Record<NonNullable<ModalProps["closePosition"]>, string> = {
  "top-center": "left-1/2 -translate-x-1/2",
  "top-right": "right-4",
}

function Modal({
  open,
  onOpenChange,
  children,
  footer,
  className,
  showClose = true,
  closePosition = "top-center",
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          data-slot="modal"
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-[2rem] shadow-xl transition-[scale,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className
          )}
          style={{ backgroundColor: AppColors.neutral }}
        >
          {/* close button sits halfway outside the popup's top edge, so it lives outside the clipped wrapper below */}
          {showClose ? (
            <Dialog.Close
              aria-label="Close"
              className={cn(
                "absolute top-0 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-md transition-colors hover:bg-neutral-800",
                closePositionClasses[closePosition]
              )}
            >
              <X className="size-4" />
            </Dialog.Close>
          ) : null}

          <div className="flex flex-1 flex-col overflow-hidden rounded-[2rem]">
            <div className="flex-1 overflow-y-auto px-6 pt-10 pb-6">{children}</div>

            {footer ? (
              <div
                className="shrink-0 rounded-b-[2rem] px-5 py-4"
                style={{ backgroundColor: AppColors.lightBlue }}
              >
                {footer}
              </div>
            ) : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Modal }
