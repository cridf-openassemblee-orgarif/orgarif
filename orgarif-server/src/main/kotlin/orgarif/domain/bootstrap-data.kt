package orgarif.domain

import kttots.Shared

// TODO[fmk][user] naming start / initial / boot / launch / base Infos ?
// ConnectedUserInfos (logged is bad wording btw)
@Shared
data class ApplicationBootstrapData(val env: ApplicationEnvironment, val userInfos: UserInfos?)
