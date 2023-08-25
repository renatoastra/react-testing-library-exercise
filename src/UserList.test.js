import {render, screen, within} from '@testing-library/react';
import UserList from './UserList';

const renderComponent = () => {
  const users = [
    {
      name: "Jane Doe", email: "jane@example.com"
    },{
      name: "John Doe",	email: "john@example.com",
      
    }
  ]
  const {container} = render(<UserList users={users} />);
  return {
    users,
    container
  }
}

test('should render one row per user', () => {
  const {container} = renderComponent()

  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr');

  expect(rows).toHaveLength(2);
})


test('render the email and name of each user', ()=> {
  const {users} = renderComponent()

  for (let user of users) {
    const name = screen.getByRole("cell", {name: user.name})
    const email = screen.getByRole("cell", {name: user.email})

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }

})