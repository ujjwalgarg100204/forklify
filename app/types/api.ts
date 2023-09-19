export type APIResponse<Data> =
    | {
          status: "ok";
          data: Data;
          message: string;
      }
    | {
          status: "error";
          data: {};
          message: string;
      };
