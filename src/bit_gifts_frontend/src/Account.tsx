import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BackendActor,
  LedgerActor,
  MinterActor,
  useAuth,
} from "./use-auth-client";
import { GiftInfo } from "../../declarations/bit_gifts_backend/bit_gifts_backend.did";
import { ckbtc_ledger } from "../../declarations/ckbtc_ledger";
import { CopyButton } from "./CopyButton";
import { encodeAccount, shortenErr } from "./utils";
import { queries } from "./queryKeys";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { PageLoading } from "./PageLoading";

function Account() {
  const { backendActor, minterActor, principal } = useAuth();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error, failureCount } = useQuery(
    queries.giftcards(queryClient, backendActor, principal),
  );

  return (
    <div className="w-max-center">
      <PageLoading
        isLoading={isLoading}
        isError={isError}
        error={error}
        failureCount={failureCount}
      />
      {data && backendActor && minterActor && "ok" in data && (
        <UserInfo
          info={data.ok}
          ledger={ckbtc_ledger}
          minter={minterActor}
          backend={backendActor}
        />
      )}
    </div>
  );
}

export default Account;

function UserInfo({
  info,
  ledger,
  backend,
}: {
  info: GiftInfo;
  ledger: LedgerActor;
  minter: MinterActor;
  backend: BackendActor;
}) {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    queries.balance(ledger, info.account),
  );

  return (
    <div>
      <h3 className="mt-8">Personal Information</h3>
      <h3 className="mt-8">ckBTC</h3>
      <p>
        You need ckBTC to create new gifts. You can either deposit your
        ckBTC your personal account shown below, or connect a wallet with ckBTC
        in it. See{" "}
        <Link to="/learn/ckbtc" className="link text-blue-700">
          About ckBTC
        </Link>{" "}
        to learn how to get and deposit ckBTC.
      </p>
      <h3 className="mt-8">Deposit ckBTC</h3>
      ckBTC deposit account:{" "}
      <CopyButton
        label="Copy ckBTC Deposit Account"
        textToCopy={encodeAccount(info.account)}
      />
      <div className="info-address">{encodeAccount(info.account)}</div>
      Account balance:{" "}
      {isLoading
        ? "loading..."
        : isError
          ? "Error: " + error
          : data?.toString() + " ckSat"}
    </div>
  );
}
