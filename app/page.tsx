'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMatches(data.matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className='flex'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Candidate Name</TableHead>
            <TableHead>Analysis</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Feedbacks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
              <TableCell>{match.id}</TableCell>
              <TableCell>{match.candidateName}</TableCell>
              <TableCell>{match.analysis}</TableCell>
              <TableCell>{match.status}</TableCell>
              <TableCell>
                {match.feedbacks.length > 0 ? (
                  <ul>
                    {match.feedbacks.map((feedback) => (
                      <li key={feedback.id}>{feedback.feedback}</li>
                    ))}
                  </ul>
                ) : (
                  'No feedbacks'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const App = () => <MatchesTable />;

export default App;
