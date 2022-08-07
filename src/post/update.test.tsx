import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { PostUpdate } from './update';
import { MockedNotificationProvider } from '../__test/MockedNotificationProvider';
import { GetPostDocument, UpdatePostDocument } from '../graphql/generated';
import { waitFor } from '@testing-library/react';

const mocks = [
  {
    request: {
      query: GetPostDocument,
      variables: { id: '1' },
    },
    result: {
      data: {
        post: {
          data: {
            _id: '1',
            title: 'read post',
            content: 'read post',
            user: {
              _id: '1',
              username: 'user',
              role: 'user',
            },
          },
        },
      },
      error: '',
    },
  },
  {
    request: {
      query: UpdatePostDocument,
      variables: { id: '1', title: 'updated', content: 'updated' },
    },
    result: {
      data: {
        updatePost: {
          data: {
            _id: '1',
            title: 'updated',
            content: 'updated',
            user: {
              _id: '1',
              username: 'user',
              role: 'user',
            },
          },
        },
      },
      error: '',
    },
  },
];

describe('Post Create page', () => {
  function renderComponent() {
    const createNotification = jest.fn();
    render(
      <MockedProvider mocks={mocks}>
        <MockedNotificationProvider createNotification={createNotification}>
          <BrowserRouter>
            <PostUpdate />
          </BrowserRouter>
        </MockedNotificationProvider>
      </MockedProvider>
    );
  }

  afterEach(cleanup);

  it('should render all elements', async () => {
    act(() => {
      renderComponent();
    });

    waitFor(() => {
      expect(screen.getByText('read post')).toBeDefined();
      expect(screen.getByText('read post')).toBeDefined();
    });
  });

  it('should update post', async () => {
    const createNotification = jest.fn();
    act(() => {
      renderComponent();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'updated' },
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'updated' },
      });
      fireEvent.click(screen.getByText('Update'));
    });

    waitFor(() => {
      expect(createNotification).toHaveBeenCalledWith(
        'success',
        'Successfully updated!'
      );
    });
  });
});
