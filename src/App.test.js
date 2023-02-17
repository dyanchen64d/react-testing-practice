import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('inputs should be initially empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText('Confirm Password');
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an emal', async () => {
  render(<App />);
  const emailInputElement = screen.getByLabelText('Email address');
  userEvent.type(emailInputElement, 'zhang@gmail.com');
  await waitFor(() => {
    expect(emailInputElement.value).toBe('zhang@gmail.com');
  });
});

test('should be able to type an password', async () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, 'passwordpassword');
  await waitFor(() => {
    expect(passwordInputElement.value).toBe('passwordpassword');
  });
});

test('should be able to type an confirm password', async () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByLabelText('Confirm Password');
  userEvent.type(confirmPasswordInputElement, 'password');
  await waitFor(() => {
    expect(confirmPasswordInputElement.value).toBe('password');
  });
});

test('should show email error message on invalid email', async () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  ); // null
  const emailInputElement = screen.getByLabelText('Email address');
  const submitButtonElement = screen.getByTestId('button');

  expect(submitButtonElement).toBeInTheDocument();

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, '123');

  userEvent.click(submitButtonElement);

  await waitFor(() => {
    const emailErrorElementAgain = screen.queryByText(
      /the email you input is invalid/i
    );
    expect(emailErrorElementAgain).toBeInTheDocument();
  });
});

test('should show password error if password is less than 5 characters', async () => {
  render(<App />);

  const emailInputElement = screen.getByLabelText('Email address');

  const passwordInputElement = screen.getByLabelText('Password');

  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  const submitButtonElement = screen.getByTestId('button');

  userEvent.type(emailInputElement, 'zhang@gmail.com');

  await waitFor(() => {
    expect(passwordErrorElement).not.toBeInTheDocument();
  });

  userEvent.type(passwordInputElement, '123');

  userEvent.click(submitButtonElement);

  await waitFor(() => {
    const passwordErrorElementAgain = screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    );
    expect(passwordErrorElementAgain).toBeInTheDocument();
  });
});

test('should show confirm password error if password not match', async () => {
  render(<App />);

  const emailInputElement = screen.getByLabelText('Email address');

  const passwordInputElement = screen.getByLabelText('Password');

  const confirmPasswordInputElement = screen.getByLabelText('Confirm Password');

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords not match. try again/i
  );

  const submitButtonElement = screen.getByTestId('button');

  userEvent.type(emailInputElement, 'zhang@gmail.com');
  userEvent.type(passwordInputElement, '12345');

  await waitFor(() => {
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  });

  userEvent.type(confirmPasswordInputElement, '123456');

  userEvent.click(submitButtonElement);

  await waitFor(() => {
    const confirmPasswordErrorElement = screen.queryByText(
      /the passwords not match. try again/i
    );
    expect(confirmPasswordErrorElement).toBeInTheDocument();
  });
});
