<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="ko">
<head>
    <jsp:include page="/WEB-INF/views/include/_include_head_meta.jsp"/>
    <jsp:include page="/WEB-INF/views/include/_include_head_common.jsp"/>
</head>
<body>
<jsp:include page="/WEB-INF/views/include/_include_body_header_2.jsp"/>

<div id="viewApp" class="container v2">
    <div class="sub-visual-section recruit">
        <div class="wadiz-inner">
            <h2 class="page-title"><span class="ir">채용정보</span></h2>
        </div>
    </div>
    <div class="wadiz-inner">
        <div class="recruit-section">

            <div v-show="viewMode == 'list'" id="list_container">

                <div class="intro-area">
                    <div class="intro-title">
                        <span class="tag"><img src="/res/pub/front/resource/images/tag_process.svg" alt="PROCESS" width="80"></span>
                        <h3 class="title">더 나은 세상을 함께 만들어갈 당신을 기다립니다</h3>
                    </div>
                    <div class="intro-cont">
                        <ul class="bul-dot">
                            <li>상황에 따라 1, 2차 면접이 1day면접으로 진행 될 수 있습니다.</li>
                            <li>이력서 제출 순으로 진행되며 채용 시 공고가 조기 마감 될 수 있습니다.</li>
                            <li>개발자의 경우 '개발테스트'를 진행하며 직군별로 실무능력 테스트가 있습니다.</li>
                            <li>경력직은 3개월간 Probation 기간을 거치며 급여는 동일한 수준으로 지급됩니다.</li>
                        </ul>
                        <p class="bul-star">인성검사는 합격/불합격 여부와 상관없이 면접관의 판단에 따라 온라인으로 진행됩니다.</p>
                    </div>
                </div>

                <div class="process-area">
                    <ol class="process-list">
                        <li><span>서류전형</span></li>
                        <li class="secondary"><span>실무진 면접 인성검사</span></li>
                        <li><span>임원 면접</span></li>
                        <li><span>처우 협의</span></li>
                        <li class="primary"><span>최종합격</span></li>
                    </ol>
                </div>

                <!-- [D] 검색결과가 나타탈 경우 숨김 처리 -->
                <div v-show="showClasses" class="desktop-select"
                        _style="display:_none">
                    <a @click="onClickClass('전체')" href="#;" class="fake-menu active" recruitclass="전체">#전체({{classAllCount}})</a>
                    <a v-for="(x, i) in classes" @click="onClickClass(x.recruitClassName)" href="#;" class="fake-menu" :recruitclass="x.recruitClassName">{{'#' + x.recruitClassName}}({{x.count}})</a>
				</div>
				<!-- [D] 검색결과가 나타탈 경우 숨김 처리 -->
				<div v-show="showClasses" class="select-box full"
                        _style="display:_none">
                    <select v-model="mobileClassName" @change="onChangeClass" class="select full" name="" id="">
                        <option value="전체">전체보기({{classAllCount}})</option>
                        <option v-for="(x, i) in classes" :value="x.recruitClassName">{{x.recruitClassName}}({{x.count}})</option>
                    </select>
				</div>

                <div class="bbs-type">
                    <ul class="bbs-list">
                        <li v-for="(x, index) in list" class="bbs-item">
                            <div class="bbs-col col-lg">
                                <div class="mob-sub-title"><em class="m-flag">[{{x.recruitClassName}}]</em></div>
                                <a @click="onClickDetail(x)" href="#" class="bbs-link">
                                    <span class="col-sub-title">[{{x.recruitClassName}}]</span>
                                    <span class="col-title">{{x.recruitNoticeName}}</span>
                                </a>
                            </div>
                            <div class="bbs-col col-s">
                                <a @click="onClickDetail(x)" class="col-flag">{{x.recruitTypeName}}</a>
                            </div>
                            <div class="bbs-col col-s last">
                                <span class="col-span date">{{x.recruitPeriod}}</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div v-html="pager">
                </div>

                <%--
                <div class="paging">
                    <a href="#;" onclick="goPreviousPage()" class="prev sp_wadiz" title="이전 페이지"><span class="a11y">이전 페이지</span></a>
                    <a href="#;" onclick="goPage('1')" class="page-number current">1</a>
                    <a href="#;" class="page-number">2</a>
                    <a href="#;" class="page-number">3</a>
                    <a href="#;" class="page-number">4</a>
                    <a href="#;" class="page-number">5</a>
                    <a href="#;" onclick="goNextPage('1')" class="next sp_wadiz" title="다음 페이지"><span class="a11y">다음 페이지</span></a>
                </div>
                --%>

                <div class="mob-paging">
                    <a href="#;" onclick="pager.goPreviousPage()" class="prev sp_wadiz"><span class="a11y">이전 페이지</span></a>
                    <a href="#;" class="page-number current">{{pageIndex}}</a>
                    <span class="separator">/</span>
                    <a href="#;" class="page-number">{{totalPage}}</a>
                    <a href="#;" onclick="pager.goNextPage()" class="next sp_wadiz"><span class="a11y">다음 페이지</span></a>
                </div>

            </div><!-- list_container -->



            <div v-show="viewMode == 'detail'" id="detail_container">
                <div class="detail-area">
                    <p class="detail-title"><%--<span class="recruit-group">[{{detail.recruitClassName}}]</span>--%> {{detail.recruitNoticeName}}</p>
                    <span class="detail-date"><span class="recruit-value"><span class="recruit-type">{{detail.recruitTypeName}}</span> </span>{{detail.recruitPeriodText}}<%--2019.10.28(월)~2019.12.31(화)--%></span>
                    <div class="detail-content">
                        <div v-html="detail.contents"></div>
                        <%--
                        <!-- [D] 에디터 영역으로 임시 스타일링 적용 -->
                        <p><img src="/res/pub/front/resource/images/temp/temp_detail_01.jpg" alt=""></p>
                        <p style="font-size: 16px;font-weight: 500;margin:40px 0;color: #333;">우와~ 진짜 짱이다! 천재야 천재!</p>
                        <p style="color: #333;">
                            각종 환호와 칭찬이 때와 장소를 가리지 않고 난무합니다. 어디서 나는 소리인고 하니 시선은 다름 없이 이 팀이 있는 곳으로 향합니다.
                            여러 부서에서 끊임 없이 들어오는 요청과 마쳤다 싶으면 새롭게 생기는 커다란 디자인 프로젝트들에 지칠 법도 한데 이 팀은 여전히 같이 웃고 서로 북돋아줍니다. <br><br>
                            와디즈 플랫폼의 역할을 재정의한 브랜드 리뉴얼과 불가능할 것 같았던 일정을 소화해내고 수많은 와디즈인의 호평을 받았던 오피스 리뉴얼을 성공적으로
                            마칠 수 있었던 원동력 역시 이 팀워크였습니다. 와디즈가 가고자 하는 길을 누구보다 응원하는 마음으로 모여 와디즈를 더 널리 알리려는 팀, 와디즈 디자인팀을 소개합니다.
                        </p>
                        --%>
                    </div>
                </div>

                <p class="content-info-txt not-pc">*위 공고에 관심이 있으신 분은 아래 "관심 포지션 등록"에 등록해주세요. 기입해주신 연락처로 포지션 정보 및 지원 방법을 안내해 드리겠습니다.</p>

                <div class="align-box tar">
                    <a @click="onClickList" href="#" class="btn-type">목록</a>
                    <a :href="'http://' + detail.recruitNoticeUrlReg" target="_blank" class="btn-type not-mb">지원하기</a>
                    <a href="https://app.smartsheet.com/b/form/d0eadbabed164f4183d6927c3f2b42d8" class="btn-type not-pc" target="_blank">관심 포지션 등록</a>
                    <%--
                    <a href="https://app.smartsheet.com/b/form/d0eadbabed164f4183d6927c3f2b42d8" target="_blank" class="btn-type not-mb">지원하기</a>
                    <a :href="'http://' + detail.recruitNoticeUrlReg" target="_blank" class="btn-type not-mb">지원하기</a>
                    <a :href="'http://' + detail.recruitNoticeUrl" target="_blank" class="btn-type not-mb">지원서 수정하기</a>
                    --%>
                </div>

            </div><!-- detail_container -->


        </div>
    </div>


</div>

<jsp:include page="/WEB-INF/views/include/_include_body_footer_2.jsp"/>
<jsp:include page="/WEB-INF/views/include/_include_body_layer_2.jsp"/>
<script src="/res/biz/js/recruit/info2.js?v=${timestamp}"></script>
</body>
</html>