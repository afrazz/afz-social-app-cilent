import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {Card, CardContent, CardHeader, Container} from '@material-ui/core';

const SkeltonLoader = () => (
  <>
    <Skeleton
      variant="rect"
      width="100%"
      height={65}
      style={{marginBottom: 10}}
    />
    <Container>
      <Skeleton
        variant="rect"
        width="100%"
        height={90}
        style={{marginBottom: '60px'}}
      />
      <Card>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{marginBottom: 6}}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />

        <Skeleton animation="wave" variant="rect" style={{height: '700px'}} />

        <CardContent>
          <>
            <Skeleton animation="wave" height={10} style={{marginBottom: 6}} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        </CardContent>
      </Card>
    </Container>
  </>
);

export default SkeltonLoader;
