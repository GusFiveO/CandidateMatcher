import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const MatchesTable = ({ matches }) => {
  return (
    <div className="flex">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Analysis</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Feedbacks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
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
                  "No feedbacks"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MatchesTable;
