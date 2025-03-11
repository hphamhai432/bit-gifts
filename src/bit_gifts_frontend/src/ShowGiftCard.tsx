import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { queries, queryKeys } from "./queryKeys";
import { useAuth } from "./use-auth-client";
import { GiftCard } from "./GiftCard";
import toast from "react-hot-toast";
import { shortenErr } from "./utils";
import TopNav from "./components/TopNav";

const ShowGiftCard = () => {
  const { giftId } = useParams();
  const { backendActor, logout, login, isAuthenticated, principal } = useAuth();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: queryKeys.show(giftId!, undefined),
    queryFn: async () => {
      const res = await backendActor!.showGiftcard(giftId!);
      if (res?.length == 1) {
        return res[0];
      } else {
        throw "gift not found";
      }
    },
    enabled: !!giftId,
  });

  const queryClient = useQueryClient();
  const info = useQuery(
    queries.giftcards(queryClient, backendActor, principal)
  );

  const formVerifyEmail = async (event: any) => {
    event.preventDefault();
    try {
      const origin = document.location.origin;
      const res = await backendActor!.getEmail(origin);
      console.log(res);
      if ("ok" in res) {
        toast.success("Verified " + res.ok);
        queryClient.invalidateQueries();
      } else {
        toast.error("Could not verify email address:\n" + shortenErr(res.err));
      }
    } catch (e: any) {
      toast.error("Could not verify email address:\n" + shortenErr(e));
    }
  };

  const isEmailVerified = info.data && "ok" in info.data;
  const isGmail =
    !data ||
    data.gift.to.endsWith("gmail.com") ||
    data.gift.to.endsWith("google.com") ||
    data.gift.to.endsWith("googlemail.com") ||
    data.gift.to.endsWith("googlemail.co.uk") ||
    data.gift.to.endsWith("googleworkspace.com");

  const changeAccount = async (e: any) => {
    try {
      e.preventDefault();
    } catch (e) {}
    await logout();
    await login();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav tab="account" />
      <div className="w-max-center pb-4 min-h-72 grow">
        {isLoading ? (
          "Loading gift " + giftId + "..."
        ) : isError ? (
          "Error: " + error
        ) : (
          <GiftCard
            gift={data!.gift}
            refundable={
              (info.data && "ok" in info.data && info.data.ok.refundable) || []
            }
            sendStatus={
              data ? [{ id: data.gift.id, status: data.sendStatus }] : []
            }
            principal={principal}
            className="max-w-2xl m-auto mt-8"
          />
        )}
        <br />
        {isGmail ? null : (
          <div className="warning">
            Looks like this card is for a non Gmail address. To redeem card, you
            have sign in to google using the same address. See{" "}
            <a
              className="link text-blue-900"
              href="https://support.google.com/accounts/answer/176347"
            >
              support.google.com
            </a>{" "}
            for instructions.
          </div>
        )}
        <div>
          {isAuthenticated ? (
            isEmailVerified ? (
              <div>
                The gift is assigned to another email address.
                <br />
                <br />
                <button
                  onClick={changeAccount}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition duration-200 mb-4"
                >
                  Change Account
                </button>
              </div>
            ) : (
              <div>
                Your email address has not been verified
                <br />
                <br />
                <form
                  action="#"
                  onSubmit={formVerifyEmail}
                  className="flex flex-row gap-4"
                >
                  <button type="submit" className="w-2/3">
                    Verify Email Address
                  </button>
                  <button
                    onClick={changeAccount}
                    className="w-1/3 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition duration-200"
                  >
                    Change Account
                  </button>
                </form>
              </div>
            )
          ) : (
            <div>
              Sign in to redeem.
              <br />
              <br />
              <button
                onClick={login}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 mb-4"
              >
                Sign in with Internet Identity
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowGiftCard;
