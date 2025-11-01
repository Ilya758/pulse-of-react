import { Box, Button, Group, NumberInput, Paper, Switch, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FC, useState } from 'react';
import { mockApiService } from '../api';
import { MOCK_SERVER } from '../model';

const BankWebsite: FC<{
  protectionEnabled: boolean;
  balance: number;
  onTransfer: () => void;
}> = ({ protectionEnabled, balance, onTransfer }) => {
  const [amount, setAmount] = useState<number | ''>(50);

  const handleTransfer = async () => {
    const transferAmount = typeof amount === 'number' ? amount : 0;
    const token = protectionEnabled ? MOCK_SERVER.csrfToken : undefined;
    const result = await mockApiService.transferFunds(transferAmount, token);

    notifications.show({
      color: result.success ? 'green' : 'red',
      message: result.message,
      title: result.success ? 'Success' : 'Error',
    });

    if (result.success) {
      onTransfer();
    }
  };

  return (
    <Paper mt="md" p="md" withBorder>
      <Title order={4}>Your Bank Account</Title>
      <Text>Your current balance: ${balance}</Text>
      <Text mt="sm">Transfer funds:</Text>
      <Group>
        <NumberInput
          min={1}
          onChange={(value) => setAmount(typeof value === 'number' ? value : '')}
          placeholder="Amount"
          value={amount}
        />
        <Button disabled={!amount || amount <= 0 || amount > balance} onClick={handleTransfer}>
          Transfer
        </Button>
      </Group>
      {protectionEnabled && (
        <Text c="dimmed" mt="xs" size="xs">
          (CSRF token is automatically included in the request)
        </Text>
      )}
    </Paper>
  );
};

const MaliciousWebsite: FC<{ onTransferComplete: () => void; balance: number }> = ({
  onTransferComplete,
  balance,
}) => (
  <Paper mt="md" p="md" style={{ borderColor: 'red' }} withBorder>
    <Title c="red" order={4}>
      Malicious Website
    </Title>
    <Text>Click the button below to win a prize!</Text>
    <form
      action="http://bank.example.com/transfer"
      id="csrf_form"
      method="POST"
      target="csrf_iframe"
    >
      <input name="amount" type="hidden" value="500" />
    </form>
    <Button
      color="red"
      disabled={balance < 500}
      mt="md"
      onClick={() => {
        mockApiService
          .transferFunds(500)
          .then((result) => {
            notifications.show({
              color: result.success ? 'green' : 'red',
              message: `Result on bank server: "${result.message}"`,
              title: 'Malicious Transfer Attempt',
            });
            if (result.success) {
              onTransferComplete();
            }
          })
          .catch(() => {
            throw new Error('Failed to transfer funds');
          });
      }}
    >
      Win a Prize!
    </Button>
    <iframe name="csrf_iframe" style={{ display: 'none' }} title="csrf-frame" />
  </Paper>
);

export const Example: FC = () => {
  const [protectionEnabled, setProtectionEnabled] = useState(false);
  const [balance, setBalance] = useState(MOCK_SERVER.balance);
  MOCK_SERVER.isCsrfProtectionEnabled = protectionEnabled;

  const syncBalance = () => {
    setBalance(MOCK_SERVER.balance);
  };

  const resetState = () => {
    MOCK_SERVER.balance = 1000;
    setBalance(MOCK_SERVER.balance);
    setProtectionEnabled(false);
  };

  return (
    <Paper radius="md">
      <Title mb="md" order={3}>
        CSRF Attack Simulation
      </Title>

      <Group>
        <Switch
          checked={protectionEnabled}
          label="Enable Anti-CSRF Token Protection"
          onChange={(event) => setProtectionEnabled(event.currentTarget.checked)}
        />
        <Button onClick={resetState} size="xs" variant="outline">
          Reset Simulation
        </Button>
      </Group>

      <Text mt="md" size="sm">
        Below are two simulated websites. The first is your bank, where you are authenticated. The
        second is a malicious website.
      </Text>

      <Box mt="lg">
        <BankWebsite
          balance={balance}
          onTransfer={syncBalance}
          protectionEnabled={protectionEnabled}
        />
        <MaliciousWebsite balance={balance} onTransferComplete={syncBalance} />
      </Box>
    </Paper>
  );
};
