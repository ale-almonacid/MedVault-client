import React from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

const MAX_VISIBLE_AVATARS = 3

function getInitials(username) {
  if (!username) {
    return "?"
  }

  return username
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function AvatarGroupCountComp({ users = [] }) {

  const visibleUsers = users.slice(0, MAX_VISIBLE_AVATARS)
  const hiddenCount = users.length - visibleUsers.length

  return (
    <AvatarGroup>
      {visibleUsers.map((user) => (
        <Avatar key={user._id}>
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
        </Avatar>
      ))}
      {hiddenCount > 0 && <AvatarGroupCount>+{hiddenCount}</AvatarGroupCount>}
    </AvatarGroup>
  )
}

export default AvatarGroupCountComp
