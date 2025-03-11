import { Principal } from "@dfinity/principal";
import {
  Account,
  GiftInfo,
} from "../../declarations/bit_gifts_backend/bit_gifts_backend.did";
import { encodeAccount } from "./utils";
import { BackendActor, LedgerActor } from "./use-auth-client";
import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const queryKeys = {
  giftcards: (principal?: Principal) => ["giftcards", principal],
  userinfo: (info: GiftInfo) => ["userinfo", info.caller],
  balance: (account?: Account) => ["balance", encodeAccountOrNull(account)],
  show: (id: string, account?: Account) => [
    "show",
    id,
    encodeAccountOrNull(account),
  ],
};

const encodeAccountOrNull = (account?: Account) => {
  if (!account) return null;
  try {
    return encodeAccount(account);
  } catch (e) {
    console.log("invalid account for query key:", account);
    return null;
  }
};

export const mutations = {
  createGift: (backend: BackendActor) => ({
    mutationFn: async (params: {
      receiver: string;
      amount: bigint;
      name: string;
      message: string;
      design: string;
      fee: bigint;
    }) => {
      const result = await backend.createGift(
        params.receiver,
        params.amount,
        params.fee,
        params.name,
        params.message,
        params.design
      );
      if ("err" in result) {
        throw result.err;
      }
      return result.ok;
    },
  }),
};

export const queries = {
  giftcards: (
    queryClient: QueryClient,
    backend?: BackendActor,
    principal?: Principal
  ) => {
    return {
      queryKey: queryKeys.giftcards(principal),
      queryFn: async () => {
        if (backend && principal && !principal.isAnonymous()) {
          var res = await backend.listGifts();
          if ("err" in res) {
            console.log("Error:", res.err);
          }
          return res;
        }
        return null;
      },
    };
  },
  balance: (ledger: LedgerActor, account?: Account) => {
    return {
      queryKey: queryKeys.balance(account),
      queryFn: () => {
        if (!account) return null;
        console.log("Account:", account)
        return ledger.icrc1_balance_of({
          owner: account.owner,
          subaccount: account.subaccount,
        });
      },
    };
  },
};
