import React, {memo} from 'react'

import { connect } from 'react-redux'
import { Switch ,Route, Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'

import route_data from './router.config'
import pages from '@/pages'

const Routes = memo((props) => {
  const { level = 0 } = props
  
  return !level ? 
    <Switch>
      <Route path="/login" component={pages.Login}></Route>
      <Route path="/404" component={pages.NoPage}></Route>
      <Redirect from="/*" to='/404'></Redirect>
    </Switch>
    :
    <>
      {renderRoutes(route_data)}
    </>
})

const mapStateToProps = state => ({
  level: state.user.level
})
export default connect(mapStateToProps)(Routes)