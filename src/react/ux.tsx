/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { ReactNode, useEffect, useState } from "react";
import { TreeView, Tree } from "fluid-framework";
import { StringArray } from "../schema/schema.js";
import { EmptyDataGridCreator } from "./gridux.js";

export function ReactApp(): JSX.Element {
	return <EmptyDataGridCreator />;
}
