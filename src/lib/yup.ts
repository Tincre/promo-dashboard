/* Copyright Tincre (Musicfox, Inc)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as yup from 'yup';

const settingsDetailSchema = yup.object().shape({
  name: yup.string().nullable(),
  avatarUrl: yup.string().nullable(),
  userName: yup.string().nullable(),
  email: yup.string().nullable(),
});
export { settingsDetailSchema };
