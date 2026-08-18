import React from 'react';

export const MemberProfileWidget: React.FC<{ memberId: string }> = ({ memberId }) => {
  // Uses Application Service to fetch the member profile details
  return (
    <div className="member-profile">
      <h3>Member Profile</h3>
      <p>Fetching profile for {memberId} via MembershipQueryApplicationService...</p>
      {/* Display Member details */}
    </div>
  );
};
