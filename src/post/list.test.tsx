import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { PostList } from './list';
import { MockedNotificationProvider } from '../__test/MockedNotificationProvider';
import { GetPostsDocument, DeletePostDocument } from '../graphql/generated';

const mocks = [
  {
    request: {
      query: GetPostsDocument,
    },
    result: {
      data: {
        posts: {
          data: [
            {
              _id: '1',
              title: 'first',
              content: 'first post',
              user: { _id: '1', username: 'user', role: 'user' },
            },
            {
              _id: '2',
              title: 'second',
              content: 'second post',
              user: { _id: '1', username: 'user', role: 'user' },
            },
          ],
          error: '',
        },
      },
    },
  },
  {
    request: {
      query: DeletePostDocument,
      variables: { id: '2' },
    },
    result: {
      data: {
        deletePost: {
          data: {
            _id: '2',
            title: 'second',
            content: 'second post',
            user: {
              _id: '1',
              username: 'user',
            },
          },
          error: '',
        },
      },
    },
  },
];

describe('Post list page: ', () => {
  function renderComponent() {
    return render(
      <MockedProvider mocks={mocks}>
        <MockedNotificationProvider>
          <BrowserRouter>
            <PostList />
          </BrowserRouter>
        </MockedNotificationProvider>
      </MockedProvider>
    );
  }

  afterEach(cleanup);

  it('should render all elements', () => {
    act(() => {
      renderComponent();
    });

    const posts = [
      {
        title: 'first',
        content: 'first post',
      },
      {
        title: 'second',
        content: 'second post',
      },
    ];
    posts.forEach((post) => {
      expect(screen.findByText(post.title)).toBeDefined();
      expect(screen.findByText(post.content)).toBeDefined();
    });
  });

  it('should delete post', async () => {
    act(() => {
      renderComponent();
    });

    await waitFor(() => {
      const deleteIcon = screen.getByTestId('delete1');
      fireEvent.click(deleteIcon);

      const confirmBtn = screen.getByTestId('confirmOK');
      fireEvent.click(confirmBtn);

      waitFor(() => {
        expect(screen.getByText('first post')).not.toBeDefined();
      });
    });
  });
});
