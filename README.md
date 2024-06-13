## 목차
  - 프로젝트 소개
  - 기술스택
  - 주요기능
  - 문제해결경험험

## 풋살장 예약 서비스
- 일정 및 대여 물품을 선택하여 예약할 수 있는 축구장 예약 서비스입니다.
<br>

## 프로젝트 소개
- 실제 축구장 예약 서비스 이용 시 불편했던 점들을 개선하였습니다.
  - 예약과 동시에 결제가 되도록 구현 했습니다.
  - 예약 결제와 대여 물품 결제를 한 번에 처리하도록 구현하였습니다.
  - 예약이 마감 된 시간대를 쉽게 구분 할 수 있도록 구현하였습니다.
    
<br>

## 기술스택
- JAVA, JavaScript
- jQuery, thymeleaf
- Spring Boot
- MySQL, JPA

<br>

## 주요 기능
**[로그인]**
- Spring Security를 이용한 로그인 구현
- 유효성 검사 구현 시 SimpleUrlAuthenticationFailureHandler 인터페이스 사용

|  |  |
|---------|---------|
|<img src="https://github.com/dmstks04/watb/assets/88867851/ead8cc02-a176-4f01-b3e1-16a3805458eb.png" width="300" height="200"/>|<img src="https://github.com/dmstks04/watb/assets/88867851/84fe4ed4-dadb-4847-bb65-7d6a72eeeab8.png" width="300" height="200"/>|

<br>

**[회원가입]**
- 유효성 검사 구현 시 @Valid, BindingResult 사용

|  |  |
|---------|---------|
|<img src="https://github.com/dmstks04/watb/assets/88867851/ef394911-abdf-4d55-8f55-a0a0e144faac.png" width="300" height="300"/>|<img src="https://github.com/dmstks04/watb/assets/88867851/522d36ff-0283-44ea-aedc-63fef466d031.png" width="300" height="300"/>|

<br>

**[예약]**
| 예약 페이지 |
|-----|
|<img src="https://github.com/dmstks04/watb/assets/88867851/094da422-2e8b-401c-ad05-4304806aa09b.png" width="700" height="800"/>|


- 인원수 선택 버튼
- 이용시간 선택, 시간당 계산 동작
- 날짜 선택
  - 현재 날짜에는 '오늘' 이라는 텍스트가 표시됩니다.
  - 달력에서 다음 달에 해당 하는 날짜 클릭 시 다음 달로 이동되면서 해당 날짜 선택 표시합니다.
  - 날짜 클릭 시 시간 선택 버튼이 로딩 되도록 구현하였습니다.
- 시간 선택
  - 달력의 날짜가 오늘 날짜와 같을 경우 현재 시간 이후의 시간 버튼만 출력됩니다.
  - 이미 예약 된 시간대는 '예약마감' 처리하였습니다.
    - 날짜 클릭 시 해당 날짜를 AJAX로 요청하여 예약 내역을 확인하고 예약이 있다면
   
      
       예약 시간을 확인한 뒤에 해당 시간대를 '예약마감' 출력하도록 구현하였습니다.
      
    | 시간 버튼 예시 |
    |-----|
    |<img src="https://github.com/dmstks04/watb/assets/88867851/b207716c-1329-44d8-a67d-7404dc62e86f.png" width="400" height="250"/>|
  

  
- 대여물품
  - 선택한 옵션을 출력합니다.
  - 개수 변경 버튼, 변경될 때마다 옵션의 가격이 변경됩니다.

   |  |  |
   |-----| ----- |
   |<img src="https://github.com/dmstks04/watb/assets/88867851/66d5cf90-f9f2-4822-8a52-c5471f23be98.png" width="400" height="100"/>|<img src="https://github.com/dmstks04/watb/assets/88867851/54411cfb-c754-473b-a74b-d839760db214.png" width="400" height="200"/>|
  
- 최종 금액 계산
  - 이용시간과 옵션이 변경 될 때 마다 동적으로 동작합니다.
  - 이용시간과 대여물품의 합계를 계산하도록 구현하였습니다.
<br>

**[예약 확인 페이지]**
- sessionStroage에 저장된 예약정보 출력합니다.
- 결제 버튼 클릭 시 예약 및 결제를 진행합니다.

  | 예약 확인 예시 |
  |-----|
  |<img src="https://github.com/dmstks04/watb/assets/88867851/8b576f8d-ab31-4392-9ec1-a25dfcc32b5f.png" width="480" height="420"/>|

**[결제]**
- 포트원API로 카카오 결제 구현하였습니다.
- 예약 엔티티의 날짜와 시간에 index를 추가하여 예약 중복방지하였습니다.
- 예약 결제 금액과 포트원 결제API의 응답 금액과 일치하는지 확인합니다.
    
<br>

**[마이페이지]**
- 회원의 예약 내역 출력합니다.
- 예약취소 진행 시 현재날짜와 예약날짜를 compareTo로 비교합니다.
- compareTo의 결과가 2 이상이면 결제취소 기능 동작합니다.
- 예약 테이블에 매핑된 결제 상태값으로 '환불완료', '결제완료' 구분하였습니다.
  
  |  |
  |-----|
  |<img src="https://github.com/dmstks04/watb/assets/88867851/b8347437-191b-40a9-b3db-37f4381fa6b1.png" width="600" height="200"/>|
  |<img src="https://github.com/dmstks04/watb/assets/88867851/9810d86b-dd2e-4e38-acbe-258e3637d825.png" width="600" height="200"/>|
  |<img src="https://github.com/dmstks04/watb/assets/88867851/da066fed-0b33-47cb-9879-f33804ac7794.png" width="600" height="200"/>|

<br>

## 문제해결경험
- **예약이 마감된 시간을 어떻게 표시할지에 대한 고민**
  - 별도의  예약 시간 테이블을 생성하고, 요청 시점에 해당 테이블을 조회할지 고민했습니다. 이 경우 불필요한 데이터의 증가 및 데이터베이스 관리가 복잡해지는 단점이 있었습니다.
  - 날짜를 클릭하면 AJAX로 요청하여 해당 날짜에 예약내역이 있는 경우 예약시간을 리턴 받은 뒤
구분하여 표시하도록 해결했습니다.
- **JSON 배열 형식으로 저장되는 데이터를 DB에 어떻게 저장할지에 한 고민**
  - 대여물품 테이블을 생성하여  예약내역에 매핑할 경우 불필요한 데이터 증가와 데이터베이스 관리가 복잡해지며 가독성이 떨어지는 단점이 있습니다.

  - 해결방법  : 예약 Entity의 대여물품 컬럼에 @Convert와 AttributeConverter 인터페이스를 사용하여 해결하였습니다.
  - ```java
    public class Reservation {
      // 생략
      @Convert(converter = StringListConverter.class)
      private List<Map<String, Integer>> optionInfo;
    }
    ``` 
  - ```java
    @Converter
    public class StringListConverter implements AttributeConverter<List<Map<String, Integer>>, String> {
    }
    ```
- **N:1 관계에서 지연 로딩 사용 시 LazyInitializationException발생**
  - fetch join을 사용하거나 DTO를 사용하여 프록시 초기화 오류 방지하는 방법들이 있습니다.
  - 이 중 권장되는 사항인 서비스 단에서 트랙잭션이 종료되는 시점에 엔티티를 DTO로 변환하는 방법을 사용하였습니다.
