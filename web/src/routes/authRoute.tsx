import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { AuthRequired } from './AuthRequired'
import { SignUp } from '../pages/SignUp/SignUp'
import { NoMatch } from '../pages/NoMatch/NoMatch'
import { Routes as RRoutes, Route } from 'react-router-dom'
import { Review } from '../pages/Review/Review'

export const Routes = () => {
  return (
    <RRoutes>
      {/* TODO: #22 transform this in a component */}
      <Route
        path="/"
        element={
          <AuthRequired>
            <Home />
          </AuthRequired>
        }
      />
      <Route
        path="/review"
        element={
          <AuthRequired>
            <Review />
          </AuthRequired>
        }
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
    </RRoutes>
  )
}