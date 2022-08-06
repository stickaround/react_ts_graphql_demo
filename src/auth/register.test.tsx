import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { Register } from './register';
import { RegisterDocument } from '../graphql/generated';
import { MockedNotificationProvider } from '../__test/MockedNotificationProvider';

const mocks = [
  {
    request: {
      query: RegisterDocument,
      variables: { username: 'newUser', password: 'password' },
    },
    result: {
      data: {
        register: {
          data: {
            username: 'newUser',
            role: 'user',
          },
          token: 'someToken',
          error: '',
        },
      },
    },
  },
];

describe('Register Page: ', () => {
  afterEach(cleanup);

  it('should render all elements', () => {
    act(() => {
      render(
        <MockedProvider>
          <MockedNotificationProvider>
            <BrowserRouter>
              <Register />
            </BrowserRouter>
          </MockedNotificationProvider>
        </MockedProvider>
      );
    });
    expect(screen.getByLabelText('Username')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getByText('Register')).toBeDefined();
    expect(screen.getByText('Login')).toBeDefined();
  });

  it('should validate form when submit', async () => {
    act(() => {
      render(
        <MockedProvider>
          <MockedNotificationProvider>
            <BrowserRouter>
              <Register />
            </BrowserRouter>
          </MockedNotificationProvider>
        </MockedProvider>
      );
    });

    act(() => {
      fireEvent.click(screen.getByText('Register'));
    });
    expect(screen.queryByDisplayValue('Input username!')).toBeDefined();
    expect(screen.queryByDisplayValue('Input password!')).toBeDefined();
  });

  it('should register after validation', async () => {
    const createNotification = jest.fn();
    act(() => {
      render(
        <MockedProvider mocks={mocks}>
          <MockedNotificationProvider createNotification={createNotification}>
            <BrowserRouter>
              <Register />
            </BrowserRouter>
          </MockedNotificationProvider>
        </MockedProvider>
      );
    });

    act(() => {
      fireEvent.change(screen.getByLabelText('Username'), {
        target: { value: 'newUser' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password' },
      });
      fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() =>
      expect(createNotification).toHaveBeenCalledWith(
        'success',
        'Register success!'
      )
    );
  });
});
