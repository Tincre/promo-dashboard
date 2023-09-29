/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEvent, useState } from 'react';
const isHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-200 px-2 py-1 text-xs md:text-sm shadow sm:px-3 sm:py-2 hover:bg-slate-200 hover:shadow-lg border border-1 border-slate-700 dark:border-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:border-slate-200 mx-2 sm:mx-3';
const isNotHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-50 px-2 py-1 text-xs md:text-sm shadow sm:px-3 sm:py-2 hover:bg-slate-200 hover:shadow-lg border border-1 border-transparent dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 mx-2 sm:mx-3';

export function ChartButton({
  isSelected = false,
  onClick,
  children,
}: {
  isSelected?: Boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>, buttonType: string) => void;
  children?: string;
}) {
  return (
    <button
      key={children}
      onClick={(e) =>
        typeof onClick !== 'undefined'
          ? onClick(e, children || '1 month')
          : null
      }
      className={
        isSelected ? isHighlightedClassName : isNotHighlightedClassName
      }
    >
      {children}
    </button>
  );
}
