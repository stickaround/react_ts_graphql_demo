import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { PostCreate } from './create';
import { MockedNotificationProvider } from '../__test/MockedNotificationProvider';
import { CreatePostDocument } from '../graphql/generated';
import { waitFor } from '@testing-library/react';

const mocks = [
  {
    request: {
      query: CreatePostDocument,
      variables: { title: 'create post', content: 'post content' },
    },
    result: {
      data: {
        createPost: {
          data: {
            _id: '1',
            title: 'create post',
            content: 'post content',
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
            <PostCreate />
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

    expect(screen.getByLabelText('Title')).toBeDefined();
    expect(screen.getByLabelText('Content')).toBeDefined();
  });

  it('should validate form', async () => {
    act(() => {
      renderComponent();
    });

    act(() => {
      fireEvent.click(screen.getByText('Create'));
    });

    waitFor(() => {
      expect(screen.getByDisplayValue('Input title!')).toBeDefined();
      expect(screen.getByDisplayValue('Input content!')).toBeDefined();
    });
  });

  it('should create post after validation', async () => {
    const createNotification = jest.fn();
    act(() => {
      renderComponent();
    });

    act(() => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'create post' },
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'post content' },
      });
      fireEvent.click(screen.getByText('Create'));
    });

    waitFor(() => {
      expect(createNotification).toHaveBeenCalledWith(
        'success',
        'Successfully created!'
      );
    });
  });
});
