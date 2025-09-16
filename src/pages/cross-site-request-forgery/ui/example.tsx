import { FC, useState } from 'react';
import { Paper, Title, Text, Button, Group, NumberInput, Switch, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
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
      title: result.success ? 'Success' : 'Error',
      message: result.message,
      color: result.success ? 'green' : 'red',
    });

    if (result.success) {
      onTransfer();
    }
  };

  return (
    <Paper withBorder p="md" mt="md">
      <Title order={4}>Your Bank Account</Title>
      <Text>Your current balance: ${balance}</Text>
      <Text mt="sm">Transfer funds:</Text>
      <Group>
        <NumberInput
          value={amount}
          onChange={(value) => setAmount(typeof value === 'number' ? value : '')}
          placeholder="Amount"
          min={1}
        />
        <Button disabled={!amount || amount <= 0 || amount > balance} onClick={handleTransfer}>
          Transfer
        </Button>
      </Group>
      {protectionEnabled && (
        <Text size="xs" c="dimmed" mt="xs">
          (CSRF token is automatically included in the request)
        </Text>
      )}
    </Paper>
  );
};

const MaliciousWebsite: FC<{ onTransferComplete: () => void; balance: number }> = ({
  onTransferComplete,
  balance,
}) => {
  return (
    <Paper withBorder p="md" mt="md" style={{ borderColor: 'red' }}>
      <Title order={4} c="red">
        Malicious Website
      </Title>
      <Text>Click the button below to win a prize!</Text>
      <form
        action="http://bank.example.com/transfer"
        method="POST"
        target="csrf_iframe"
        id="csrf_form"
      >
        <input type="hidden" name="amount" value="500" />
      </form>
      <Button
        mt="md"
        color="red"
        disabled={balance < 500}
        onClick={() => {
          mockApiService.transferFunds(500).then((result) => {
            notifications.show({
              title: 'Malicious Transfer Attempt',
              message: `Result on bank server: "${result.message}"`,
              color: result.success ? 'green' : 'red',
            });
            if (result.success) {
              onTransferComplete();
            }
          });
        }}
      >
        Win a Prize!
      </Button>
      <iframe name="csrf_iframe" style={{ display: 'none' }} title="csrf-frame" />
    </Paper>
  );
};

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
      <Title order={3} mb="md">
        CSRF Attack Simulation
      </Title>

      <Group>
        <Switch
          checked={protectionEnabled}
          onChange={(event) => setProtectionEnabled(event.currentTarget.checked)}
          label="Enable Anti-CSRF Token Protection"
        />
        <Button size="xs" variant="outline" onClick={resetState}>
          Reset Simulation
        </Button>
      </Group>

      <Text mt="md" size="sm">
        Below are two simulated websites. The first is your bank, where you are authenticated. The
        second is a malicious website.
      </Text>

      <Box mt="lg">
        <BankWebsite
          protectionEnabled={protectionEnabled}
          balance={balance}
          onTransfer={syncBalance}
        />
        <MaliciousWebsite onTransferComplete={syncBalance} balance={balance} />
      </Box>
    </Paper>
  );
};

