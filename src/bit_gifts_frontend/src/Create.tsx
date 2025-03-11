import { useAuth } from "./use-auth-client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { formatCurrency, shortenErr } from "./utils";
import { Link, useNavigate } from "react-router-dom";
import { ckbtc_ledger } from "../../declarations/ckbtc_ledger";
import { ThemeSelect } from "./ThemeSelect";
import { useState } from "react";
import { queries, mutations } from "./queryKeys";
import toast from "react-hot-toast";
import { confirmDialog } from "./CopyButton";
import { GiftCard } from "./GiftCard";
import EmailTemplate, { ScrollTarget } from "./email/EmailTemplate";
import { ThemeKey } from "./cardThemes";
import { Button } from "./components/ui/button";

function Create() {
  const queryClient = useQueryClient();
  const { backendActor, principal } = useAuth();
  const navigate = useNavigate();

  const { data } = useQuery(
    queries.giftcards(queryClient, backendActor, principal)
  );

  const createGiftMutation = useMutation({
    ...mutations.createGift(backendActor!),
    onSuccess: (gift) => {
      queryClient.invalidateQueries();
      toast.success("gift created successfully");
      navigate("/send/" + gift.id);
    },
    onError: (err) => {
      toast.error("Failed to create gift: " + shortenErr(err));
    },
  });

  const [useCustomAmount, setUseCustomAmount] = useState(false);

  const [formData, setFormData] = useState({
    id: "xxxxxxxxxxxxxxxxx",
    amount: 1000n,
    customAmount: 100n,
    to: "",
    design: "",
    sender: "",
    created: BigInt(Number(new Date())) * 1000000n,
    creator: principal!,
    message: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const receiver: string = event.target.elements.to.value;
    var amount: bigint = BigInt(event.target.elements.amount.value);
    if (useCustomAmount) {
      amount = BigInt(event.target.elements.customAmount.value);
    }
    var fee: bigint = amount >= 10000n ? (amount * 1n) / 100n : 10n; // 1% fee
    const name: string = event.target.elements.sender.value;
    const message: string = event.target.elements.message.value;
    const design: string = event.target.elements.design.value;

    if (createGiftMutation.isPending) {
      return;
    }
    console.log("gift params:", receiver, amount, name, message, design);

    await confirmDialog({
      msg:
        "Create a gift with " +
        amount.toString() +
        " ckSat for " +
        receiver +
        "?",
      sub:
        "A total of " +
        (amount + fee).toString() +
        " ckSat will be deducted from your main account.",
    });

    if (createGiftMutation.isPending) {
      return;
    }

    createGiftMutation.mutate({
      receiver,
      amount,
      fee,
      name,
      message,
      design,
    });
    return false;
  };

  const [scroll, setScroll] = useState<ScrollTarget | undefined>(undefined);

  const account = data && "ok" in data ? data.ok.account : undefined;
  const balance = useQuery(queries.balance(ckbtc_ledger, account));

  const handleAmountChange = (e: any) => {
    console.log("Selected amount", e.target.value);
    setUseCustomAmount(e.target.value === "0");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setScroll(id === "design" ? "theme" : "message");
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="content w-max-center mb-4 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
      <form action="#" onSubmit={handleSubmit} className="w-full">
        <h3 className="w-full">New Gift</h3>
        <ThemeSelect id="design" onChange={handleChange} />
        <label htmlFor="sender">Enter your name: &nbsp;</label>
        <input id="sender" alt="Name" type="text" onChange={handleChange} />
        <label htmlFor="to">Recipient receiver: &nbsp;</label>
        <input
          id="to"
          alt="receiver"
          type="receiver"
          onChange={(e: any) => {
            handleChange(e);
          }}
        />
        <label className="w-full text-base text-right">
          Current balance:{" "}
          {balance.isLoading
            ? "loading..."
            : balance.isError ||
              balance.data === null ||
              balance.data === undefined
            ? "-"
            : balance.data.toString() + " ckSat"}
        </label>
        <label htmlFor="amount">Amount: &nbsp;</label>
        <select
          id="amount"
          onChange={(e) => {
            handleAmountChange(e);
            handleChange(e as any);
          }}
        >
          {/* TODO: get current exchange rate */}
          <option value="1000">1000 ckSat (~1$)</option>
          <option value="2222">2222 ckSat (🦆🦆🦆🦆)</option>
          <option value="5000">5000 ckSat (~5$)</option>
          <option value="10000">10000 ckSat (~10$)</option>
          <option value="21000">21000 ckSat (~21$)</option>
          <option value="50000">50000 ckSat (~50$)</option>
          <option value="0">Custom Amount...</option>
        </select>
        <div className="w-full" hidden={!useCustomAmount}>
          <label />
          <div className="input-container relative">
            <span className="absolute right-12 top-4">ckSat</span>
            <input
              type="number"
              id="customAmount"
              placeholder=""
              min={500}
              max={100000}
              onChange={handleChange}
            />
          </div>
        </div>
        <label htmlFor="message">Enter a message: &nbsp;</label>
        <textarea id="message" rows={5} onChange={handleChange} />
        <Button
          type="submit"
          disabled={createGiftMutation.isPending}
          className={
            createGiftMutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : ""
          }
        >
          {createGiftMutation.isPending ? "Creating..." : "Create Gift!"}
        </Button>
      </form>
      <div className="w-full flex flex-col">
        <h3 className="w-full">Preview</h3>

        <div className="border border-4 border-gray-200 bg-gray-200 text-right text-gray-400 pr-2 w-full">
          O O O
        </div>
        <div className="border border-4 flex-grow flex flex-col">
          <EmailTemplate
            recipientName={formData.to}
            amount={formatCurrency(
              useCustomAmount ? formData.customAmount : formData.amount,
              10000000,
              0
            )}
            value={formatCurrency(
              useCustomAmount ? formData.customAmount : formData.amount,
              1000,
              2
            )}
            senderName={formData.sender}
            customMessage={formData.message}
            theme={formData.design as ThemeKey}
            redeemPath="#"
            scrollTo={scroll}
          />
        </div>
      </div>
    </div>
  );
}

export default Create;
