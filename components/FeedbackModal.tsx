import React, { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  username: string;
}

export function FeedbackModal({ isOpen, onClose, onSubmit, username }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    setIsSubmitting(true);
    await onSubmit(rating, comment);
    setIsSubmitting(false);
    setRating(0);
    setComment('');
    onClose();
  };

  const handleSkip = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8 md:p-16">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative my-12 md:my-16">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">We value your feedback!</h2>
          <p className="text-gray-600">Help us improve your experience with HealthAssist AI</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you rate your experience?
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm text-gray-600 mt-2">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="feedback-comment" className="block text-sm font-medium text-gray-700 mb-2">
            Additional comments (optional)
          </label>
          <textarea
            id="feedback-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you think..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
}
