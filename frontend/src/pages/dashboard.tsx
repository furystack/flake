import { Container, Typography } from '@mui/material'
import { useCurrentUser } from '../hooks/use-current-user'

export const DashboardPage = () => {
  const currentUser = useCurrentUser()
  return (
    <Container style={{ padding: '2em' }}>
      <Typography variant="h1">Welcome, {currentUser.username}! </Typography>
      <Typography variant="body1">
        The site is under construction. Imagine here a yellow animated construction sign gif that I was too lazy to add.
        And now some lorem ipsum to test the scroll and header hiding.
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, dolorem veritatis? Laboriosam in facere aut
        magni commodi voluptate aliquid porro cupiditate quae debitis nostrum, totam quaerat voluptates, reprehenderit
        mollitia impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti
        labore temporibus fugit beatae dolore eaque Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
        recusandae cumque, blanditiis aperiam dolor laborum dignissimos alias deleniti tenetur consequuntur et
        perspiciatis officia, fuga molestiae aliquam eveniet, natus ducimus quos? consectetur ex facere delectus minima,
        enim accusamus illo, dolores blanditiis totam?
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti labore temporibus
        fugit beatae dolore eaque consectetur ex facere delectus minima, enim accusamus illo, dolores blanditiis totam?
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti labore temporibus
        fugit beatae dolore eaque consectetur ex facere delectus minima, enim accusamus illo, dolores blanditiis totam?
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti labore temporibus
        fugit beatae dolore eaque consectetur ex facere delectus minima, enim accusamus illo, dolores blanditiis totam?
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti labore temporibus
        fugit beatae dolore eaque consectetur ex facere delectus minima, enim accusamus illo, dolores blanditiis totam?{' '}
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti labore temporibus
        fugit beatae dolore eaque consectetur ex facere delectus minima, enim accusamus illo, dolores blanditiis totam?{' '}
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti labore temporibus
        fugit beatae dolore eaque consectetur ex facere delectus minima, enim accusamus illo, dolores blanditiis totam?{' '}
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum corrupti at deleniti labore temporibus
        fugit beatae dolore eaque consectetur ex facere delectus minima, enim accusamus illo, dolores blanditiis totam?{' '}
      </Typography>
    </Container>
  )
}
