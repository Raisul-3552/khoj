import express from 'express';

const router = express.Router();


router.get('/users', (req, res) =>{
    
    const userData = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '123-456-7890',
      address: '123 Apple St, New York, NY'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '234-567-8901',
      address: '456 Banana Ave, Los Angeles, CA'
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      phone: '345-678-9012',
      address: '789 Cherry Blvd, Chicago, IL'
    }
  ];

    res.send(userData)
})


export default router;