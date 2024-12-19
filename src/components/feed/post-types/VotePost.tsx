import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface VoteOption {
  id: number;
  text: string;
  votes: number;
}

interface VotePostProps {
  content: string;
  voteDetails: {
    options: VoteOption[];
    totalVotes: number;
    endDate: string;
    myVote: number | null;
  };
  onVote: (optionId: number) => void;
}

export function VotePost({ content, voteDetails, onVote }: VotePostProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-indigo-600">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Community Vote</span>
      </div>
      <div className="text-gray-700 font-medium">
        {content}
      </div>
      <Card className="bg-gray-50 border-none">
        <CardContent className="p-4 space-y-4">
          {voteDetails.options.map((option) => {
            const percentage = Math.round(
              (option.votes / voteDetails.totalVotes) * 100
            );
            return (
              <div key={option.id} className="space-y-2">
                <Button
                  variant={voteDetails.myVote === option.id ? "default" : "outline"}
                  className="w-full justify-between hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => onVote(option.id)}
                >
                  <span>{option.text}</span>
                  <span className="text-sm">{percentage}%</span>
                </Button>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{voteDetails.totalVotes} votes</span>
            <span>Ends {voteDetails.endDate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}