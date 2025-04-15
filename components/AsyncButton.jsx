import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

export default function AsyncButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    // Simulate async action (e.g. API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);
    alert('Async task completed!');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      disabled={loading}
      startIcon={loading && <CircularProgress size={20} color="inherit" />}
    >
      {loading ? 'Loading...' : 'Submit'}
    </Button>
  );
}