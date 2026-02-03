import { Hackathon } from "./hackathons"

export interface UserProfile {
  skills: string[] // e.g., ["AI", "Web", "Blockchain"]
  experienceLevel: "Beginner" | "Intermediate" | "Advanced"
  preferredMode: "online" | "in-person" | "hybrid"
  previousParticipation: boolean
  teamPreference: "Solo" | "Looking for team" | "Have team"
  availability: "Low" | "Medium" | "High"
}

export interface RecommendationResult {
  id: string
  title: string
  reason: string
  confidenceScore: number
}

// Difficulty mapping
const DIFFICULTY_RANK = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
}

export function recommendHackathons(
  userProfile: UserProfile,
  hackathons: Hackathon[]
): RecommendationResult[] {
  // Score each hackathon
  const scoredHackathons = hackathons
    .map((hackathon) => ({
      hackathon,
      score: calculateScore(userProfile, hackathon),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  // If we have results, format them
  if (scoredHackathons.length > 0) {
    return scoredHackathons.map((item) =>
      formatRecommendation(userProfile, item.hackathon, item.score)
    )
  }

  // FALLBACK: Relax filters and retry
  return recommendWithFallback(userProfile, hackathons)
}

function calculateScore(userProfile: UserProfile, hackathon: Hackathon): number {
  let score = 50 // Base score

  // 1. DOMAIN MATCH (up to +30)
  const domainMatch = userProfile.skills.some(
    (skill) => skill.toLowerCase() === hackathon.domain.toLowerCase()
  )
  if (domainMatch) score += 30
  else if (userProfile.skills.length > 0) score += 10 // Partial credit for any skill match

  // 2. DIFFICULTY MATCH (up to +25)
  const userDiffRank = DIFFICULTY_RANK[userProfile.experienceLevel] || 2
  const hackDiffRank = DIFFICULTY_RANK[hackathon.level as keyof typeof DIFFICULTY_RANK] || 2

  if (hackDiffRank <= userDiffRank) {
    score += 25 // Perfect fit
  } else if (hackDiffRank === userDiffRank + 1) {
    score += 15 // Slightly challenging (good for growth)
  } else {
    score -= 20 // Too difficult, penalize
  }

  // 3. MODE PREFERENCE (up to +15)
  if (hackathon.mode === userProfile.preferredMode) {
    score += 15
  } else if (hackathon.mode === "hybrid" && userProfile.preferredMode !== "in-person") {
    score += 8 // Hybrid works for online preference
  }

  // 4. STATUS BOOST (+20 for open, +10 for upcoming)
  if (hackathon.status === "open") score += 20
  else if (hackathon.status === "closing-soon") score += 10
  else if (hackathon.status === "ended") score -= 50 // Don't recommend ended hackathons

  // 5. DEADLINE PENALTY (based on daysLeft)
  if (hackathon.daysLeft && hackathon.daysLeft < 3) {
    score -= 15 // Too soon, user won't have time
  } else if (hackathon.daysLeft && hackathon.daysLeft < 7) {
    score -= 8 // Slightly rushed
  } else if (hackathon.daysLeft && hackathon.daysLeft > 60) {
    score -= 5 // Too far away, user may forget
  }

  // 6. TEAM SIZE COMPATIBILITY (up to +10)
  if (userProfile.teamPreference === "Solo") {
    if (!hackathon.teamSize || hackathon.teamSize.max <= 1) score += 10
  } else if (userProfile.teamPreference === "Have team") {
    if (hackathon.teamSize && hackathon.teamSize.max >= 4) score += 10
  }

  // 7. POPULARITY BOOST (+5)
  if (hackathon.participants && hackathon.participants > 500) {
    score += 5 // Social proof
  }

  // 8. AVAILABILITY MATCH (up to +10)
  if (userProfile.availability === "High") score += 10
  else if (userProfile.availability === "Medium") score += 5

  // 9. PREVIOUS PARTICIPATION BONUS (up to +5)
  if (userProfile.previousParticipation) score += 5

  return Math.min(100, Math.max(0, score)) // Clamp to 0-100
}

function formatRecommendation(
  userProfile: UserProfile,
  hackathon: Hackathon,
  score: number
): RecommendationResult {
  const reasons: string[] = []

  // Build a human-friendly reason
  if (userProfile.skills.some((s) => s.toLowerCase() === hackathon.domain.toLowerCase())) {
    reasons.push(`Matches your ${hackathon.domain} skills`)
  }

  const userDiffRank = DIFFICULTY_RANK[userProfile.experienceLevel] || 2
  const hackDiffRank = DIFFICULTY_RANK[hackathon.level as keyof typeof DIFFICULTY_RANK] || 2
  if (hackDiffRank <= userDiffRank) {
    reasons.push(`${hackathon.level}-friendly difficulty`)
  }

  if (hackathon.mode === userProfile.preferredMode) {
    reasons.push(`Your preferred ${hackathon.mode} format`)
  }

  if (hackathon.daysLeft && hackathon.daysLeft > 7) {
    reasons.push(`Ample time to prepare (${hackathon.daysLeft} days left)`)
  }

  const reason =
    reasons.length > 0 ? reasons.slice(0, 2).join(" with ") : "Great opportunity for you"

  return {
    id: hackathon.id,
    title: hackathon.title,
    reason: reason.length > 150 ? reason.substring(0, 147) + "..." : reason,
    confidenceScore: Math.round(score),
  }
}

function recommendWithFallback(
  userProfile: UserProfile,
  hackathons: Hackathon[]
): RecommendationResult[] {
  // STAGE 1: Relax difficulty requirement
  const stage1 = hackathons
    .filter((h) => h.status !== "ended")
    .map((h) => ({ hackathon: h, score: calculateScore(userProfile, h) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  if (stage1.length >= 3) {
    return stage1.map((item) =>
      formatRecommendation(userProfile, item.hackathon, item.score)
    )
  }

  // STAGE 2: Show trending/popular hackathons
  const stage2 = hackathons
    .filter((h) => h.status !== "ended")
    .sort((a, b) => (b.participants || 0) - (a.participants || 0))
    .slice(0, 5)

  return stage2.map((h, idx) => ({
    id: h.id,
    title: h.title,
    reason: `Popular hackathon with ${h.participants || 0}+ participants. Great community!`,
    confidenceScore: Math.max(60 - idx * 5, 40),
  }))
}
