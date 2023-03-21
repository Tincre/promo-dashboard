/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { MouseEventHandler } from 'react';

const baseClassName =
  'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600';

export function Button({
  className,
  onClick,
  type,
  form,
  id,
  children,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  id?: string;
  children?: string;
}) {
  return (
    <button
      type={type || 'button'}
      form={form}
      id={id}
      className={
        typeof className !== 'undefined'
          ? baseClassName + className
          : baseClassName
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
