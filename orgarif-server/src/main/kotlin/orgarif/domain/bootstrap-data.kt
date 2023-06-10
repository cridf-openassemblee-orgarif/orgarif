package orgarif.domain

import kt2ts.annotation.GenerateTypescript

// TODO[tmpl][user] naming start / initial / boot / launch / base Infos ?
// ConnectedUserInfos (logged is bad wording btw)
@GenerateTypescript
data class ApplicationBootstrapData(val env: ApplicationEnvironment, val userInfos: UserInfos?)
