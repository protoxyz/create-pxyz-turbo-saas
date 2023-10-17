import { ProtocolBackendClient } from "@protoxyz/core";

import { meta } from "./data/meta";

export const BASE_URL =
  process.env.NODE_ENV === "production" ? meta.url : "http://localhost:3000";
