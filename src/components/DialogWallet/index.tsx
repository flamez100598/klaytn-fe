"use client";
import {
  ConnectorNotFoundError,
  SwitchChainNotSupportedError,
  useConnect,
  useNetwork,
} from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UserRejectedRequestError } from "viem";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useMemo } from "react";
import { ConnectorNames, createWallets } from "@/config/constants/wallet";
import WalletCard from "./WalletCard";
import { WalletConfigV2 } from "@/types/wallet.type";

const DialogWallet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { chain } = useNetwork();
  const { connectAsync, connectors, isLoading, pendingConnector } =
    useConnect();
  const { toast } = useToast();
  const _wallets = useMemo(
    () => createWallets(chain?.id, connectAsync),
    [chain?.id, connectAsync]
  );

  const connectWallet = useCallback(
    async (wallet: WalletConfigV2<ConnectorNames>) => {
      const findConnector = connectors.find(
        (c) => c.id === wallet?.connectorId
      );
      if (wallet.installed !== false) {
        try {
          const connectd = await connectAsync({ connector: findConnector });
          if (connectd) {
            onOpenChange(false);
          }
        } catch (err) {
          let errString = "";
          if (err instanceof ConnectorNotFoundError) {
            errString = err.message;
          }
          if (err instanceof SwitchChainNotSupportedError) {
            errString = err.message;
          }
          if (err instanceof UserRejectedRequestError) {
            errString = err.shortMessage;
          }
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: errString,
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            // ),
          });
          onOpenChange(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
      <Button variant="default">Connect wallet</Button>
    </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Connect wallet</DialogTitle>
          <DialogDescription className="text-center">
            By connecting your wallet, you agree to our Terms of Service and our
            Privacy Policy .
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          {_wallets.map((wallet) => (
            <WalletCard
              pendingConnector={pendingConnector}
              loadingConnect={isLoading}
              key={wallet.title}
              wallet={wallet}
              login={connectWallet}
            />
          ))}
        </div>
        {/* <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
export default DialogWallet;
