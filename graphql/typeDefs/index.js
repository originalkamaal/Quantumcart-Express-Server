
module.exports = `#graphql
"""
The response status for various operations indicating success and providing an optional message.
"""
type StatusResponse {
  success: Boolean!
  message: String
}

"""
Represents a seller with unique identifier and name.
"""
type Seller {
  id: ID!
  name: String!
}


"""
The response for refreshing a seller's authentication token,
including the authentication status, access token, and refresh token.
"""
type SellerAuthTokenRefreshResponse {
  responseStatus: StatusResponse
  accessToken: String
  refreshToken: String
}

"""
The response for checking the onboarding progress of a seller.
"""
type OnboardingProgressResponse {
  responseStatus: StatusResponse
  progress: String
}

"""
Queries related to seller authentication and onboarding progress.
"""
type Query {
  """
  Get the onboarding progress for a specific seller.
  """
  sellerAuthProgress(sellerId: ID!): OnboardingProgressResponse
}

"""
Mutations related to seller authentication and registration.
"""
type Mutation {
  """
  Create an authentication token for a seller using email and password.
  """
  sellerAuthTokenCreate(email: String!, password: String!): StatusResponse
  
  """
  Pass uid and token to verify email of the user.
  """
  sellerAuthVerifyEmail(uid: String!, token: String!) : StatusResponse

  """
  Register a seller with the provided information, including name, email, phone, and password.
  """
  sellerAuthRegister(
    name: String!
    email: String!
    phone: String!
    password: String!
    whatsAppMarketing: Boolean!
  ): StatusResponse
}

`