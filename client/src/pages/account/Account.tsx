import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../components/TabPanel";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AccountCard from "./AccountCard";
import Button from "@mui/material/Button";
import { useAccounts } from "../../hooks/useAccounts";
import FormDialog from "../../components/FormDialog";
import AccountForm, { type AccountFormDataType } from "./AccountForm";
import AccountSummary from "./AccountSummary";
import AccountTransactions from "./AccountTransactions";
import TransferMoneyButton from "../../components/TransferMoneyButton";
import type { AccountItem } from "../../services/accounts";

function Account() {
  const [tab, setTab] = useState(0);
  const { personalAccounts, investmentAccounts } = useAccounts();
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<AccountFormDataType | null>(null);

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedAccount(null), 800);
  };

  const handleClickBtn = () => {
    setOpen(true);
  };

  const handleOnClickCard = (acc: AccountItem) => {
    console.log(acc);
    const {
      id,
      name,
      balance,
      type,
      account: { owner, targetAmt, investmentType, contributionLimit },
    } = acc;
    setOpen(true);
    setSelectedAccount({
      id,
      name,
      balance,
      owner,
      targetAmt,
      accountType: type,
      investmentType: investmentType ?? null,
      contributionLimit: contributionLimit ?? null,
    });
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          height: "100%",
          // border: "1px solid red",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            padding: 4,
            height: "100%",
            width: "70%",
          }}
        >
          <Stack direction={"row"}>
            <Tabs
              value={tab}
              onChange={handleChange}
              indicatorColor="primary"
              sx={{ flexGrow: 1 }}
            >
              <Tab label="Personal Savings" />
              <Tab label="Investment" />
            </Tabs>
            <Button variant="outlined" onClick={handleClickBtn}>
              Add Accounts
            </Button>
          </Stack>
          <Box mt={2}>
            <TabPanel index={0} value={tab}>
              <Stack spacing={2}>
                {personalAccounts.map((acc) => {
                  const {
                    name,
                    balance,
                    account: { owner, targetAmt },
                  } = acc;
                  const percentage = Math.ceil((balance / targetAmt) * 100);
                  const remaining = targetAmt - balance;

                  return (
                    <AccountCard
                      key={acc.id}
                      title={name}
                      chipLabel={owner}
                      currentAmt={balance}
                      targetAmt={targetAmt}
                      remainingAmt={remaining}
                      percentage={percentage}
                      onClick={() => handleOnClickCard(acc)}
                    />
                  );
                })}
              </Stack>
            </TabPanel>
            <TabPanel index={1} value={tab}>
              <Stack spacing={2}>
                {investmentAccounts.map((acc) => {
                  const {
                    name,
                    balance,
                    type,
                    account: { owner, targetAmt, contributionLimit },
                  } = acc;

                  const percentage = Math.ceil((balance / targetAmt) * 100);
                  const remaining = targetAmt - balance;

                  return (
                    <AccountCard
                      key={acc.id}
                      title={name}
                      chipLabel={owner}
                      accountType={type}
                      currentAmt={balance}
                      targetAmt={targetAmt}
                      remainingAmt={remaining}
                      contributionLimit={contributionLimit}
                      percentage={percentage}
                      onClick={() => handleOnClickCard(acc)}
                    />
                  );
                })}
              </Stack>
            </TabPanel>
          </Box>
        </Paper>
        <Stack spacing={1}>
          <AccountSummary />
          <AccountTransactions />
          <TransferMoneyButton label="Transfer funds" isAccounts />
        </Stack>
      </Stack>
      <FormDialog
        title={`${selectedAccount ? "Edit" : "Add"} account`}
        open={open}
        onClose={handleClose}
      >
        <AccountForm onClose={handleClose} selectedAccount={selectedAccount} />
      </FormDialog>
    </>
  );
}

export default Account;
