/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEvent, useState } from 'react';
const isHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-200 px-1 py-2 text-xs md:text-sm shadow sm:px-2 sm:py-3 hover:bg-slate-200 hover:shadow-lg border border-1 border-slate-700 dark:border-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:border-slate-200 mx-1';
const isNotHighlightedClassName =
  'relative overflow-hidden rounded-lg bg-slate-50 px-1 py-2 text-xs md:text-sm shadow sm:px-2 sm:py-3 hover:bg-slate-200 hover:shadow-lg border border-1 border-transparent dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 mx-1';

export function ChartButton({
  key,
  isSelected = false,
  onClick,
  children,
}: {
  key: string;
  isSelected?: Boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>, buttonType: string) => void;
  children?: string;
}) {
  return (
    <button
      key={key}
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
