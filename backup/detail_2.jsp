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
        <div class="inside-section">
            <div class="detail-area">
                <p class="detail-title"><%--<span class="recruit-group">[${detail.recruitClassName}]</span> --%>${detail.recruitNoticeName}</p>
                <span class="detail-date"><span class="recruit-value"><span class="recruit-type">${detail.recruitTypeName}</span> </span>${detail.recruitPeriodText}<%--2019.10.28(월)~2019.12.31(화)--%></span>
                <div class="detail-content">
                    ${detail.contents}
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

            <div class="align-box tac">
                <a href="/recruit/info2" class="btn-type dark">목록</a>
                <a href="http://${detail.recruitNoticeUrlReg}" target="_blank" class="btn-type dark not-mb">지원서 작성</a>
                <a href="https://app.smartsheet.com/b/form/d0eadbabed164f4183d6927c3f2b42d8" class="btn-type dark not-pc" target="_blank">관심 포지션 등록</a>
                <%--
                <a href="http://${detail.recruitNoticeUrl}" target="_blank" class="btn-type dark not-mb">지원서 수정</a>
                --%>
            </div>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/views/include/_include_body_footer_2.jsp"/>
<jsp:include page="/WEB-INF/views/include/_include_body_layer_2.jsp"/>
<script src="/res/biz/js/recruit/detail2.js?v=${timestamp}"></script>
</body>
</html>
