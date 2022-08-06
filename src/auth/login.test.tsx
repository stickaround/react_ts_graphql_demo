import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { Login } from './login';
import { LoginDocument } from '../graphql/generated';
import { MockedNotificationProvider } from '../__test/MockedNotificationProvider';

const mocks = [
  {
    request: {
      query: LoginDocument,
      variables: { username: 'username', password: 'password' },
    },
    result: {
      data: {
        login: {
          data: {
            _id: 'userId',
            username: 'username',
            role: 'user',
          },
          token: 'sometoken',
          error: '',
        },
      },
    },
  },
];

describe('Login Page', () => {
  it('should render all elements', () => {
    act(() => {
      render(
        <MockedProvider>
          <MockedNotificationProvider>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </MockedNotificationProvider>
        </MockedProvider>
      );
    });
    expect(screen.getByLabelText('Username')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getByText('Login')).toBeDefined();
    expect(screen.getByText('Register')).toBeDefined();
  });

  it('should validate form when submit', async () => {
    act(() => {
      render(
        <MockedProvider>
          <MockedNotificationProvider>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </MockedNotificationProvider>
        </MockedProvider>
      );
    });

    act(() => {
      fireEvent.click(screen.getByText('Login'));
    });
    expect(screen.queryByDisplayValue('Input username!')).toBeDefined();
    expect(screen.queryByDisplayValue('Input password!')).toBeDefined();
  });

  it('should login after validation', async () => {
    const createNotification = jest.fn();
    act(() => {
      render(
        <MockedProvider mocks={mocks}>
          <MockedNotificationProvider createNotification={createNotification}>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </MockedNotificationProvider>
        </MockedProvider>
      );
    });
    act(() => {
      fireEvent.change(screen.getByLabelText('Username'), {
        target: { value: 'username' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password' },
      });
      fireEvent.click(screen.getByText('Login'));
    });
    await waitFor(() =>
      expect(createNotification).toHaveBeenCalledWith(
        'success',
        'Login success!'
      )
    );
  });
});
