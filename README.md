## 프론트엔드 특별 채용 미니 프로젝트

### 1. 컴포넌트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── EditorTabs.tsx   # 탭 관리 컴포넌트
│   ├── FileTree.tsx     # 파일 트리 컴포넌트
│   ├── FileUploadHandler.tsx # 파일 업로드 핸들러
│   ├── Header.tsx      # 헤더 컴포넌트
│   └── MonacoEditorComponent.tsx # Monaco 에디터 컴포넌트
├── contexts/           # 상태 관리 컨텍스트
├── hooks/             # 커스텀 훅
├── types/             # 타입 정의
├── utils/             # 유틸리티 함수
└── App.tsx           # 루트 컴포넌트
```

### 2. 주요 기능 구현 현황

#### 완료된 부분

- Zip 파일 업로드 기능 구현
- Zip 파일 파싱 및 트리 구조 생성
- 파일 트리 UI 구현
- Monaco Editor 기본 구현
- React Hooks를 활용한 상태 관리

#### 미완성 부분 및 해결 방안

1. 파일 클릭 시 에디터에 내용 표시 기능

   - 현재 문제: HTML 파일이 그대로 표시되는 문제 발생
   - 해결 방안:
     - 파일 타입에 따른 적절한 렌더링 로직 구현
     - Monaco Editor의 language 설정을 파일 확장자에 따라 동적으로 변경
     - 이미지 파일의 경우 별도의 이미지 뷰어 컴포넌트 구현

2. 파일 다운로드 기능
   - 현재 문제: 수정된 파일을 다시 다운로드하는 기능 미구현
   - 해결 방안:
     - JSZip 라이브러리를 활용한 파일 압축 기능 구현
     - 수정된 파일 내용을 메모리에 저장하고 다운로드 시점에 압축
     - 진행 상태를 표시하는 UI 구현

### 4. 개선 방향

#### 1. 파일 처리 로직 개선

- 파일 타입 검사 로직 추가
  - MIME 타입 기반의 파일 타입 감지
  - 바이너리 파일과 텍스트 파일 구분 로직 구현
- 이미지 파일 처리
  - Base64 인코딩을 통한 이미지 미리보기
  - 이미지 최적화 및 캐싱 전략 수립

#### 2. 성능 최적화

- Monaco Editor의 lazy loading 구현
  - 동적 import를 통한 코드 스플리팅
  - 에디터 초기화 최적화
- 파일 트리의 무한 스크롤 적용
  - 가상화(virtualization) 라이브러리 도입 검토
  - 대용량 트리 데이터 처리 최적화
- Tab 상태 관리 최적화
  - Context API를 활용한 전역 상태 관리
  - 메모이제이션을 통한 렌더링 최적화

## 마무리

완성되지 못한 부분이 있지만, TypeScript와 React를 활용한 코드 에디터 구현의 기본적인 구조를 구현하는데 성공했습니다. 처음에는 Zip 파일 처리나 Monaco Editor 구현이 어려울 것 같았지만, 하나씩 해결해나가면서 많은 것을 배울 수 있었습니다.

특히 Zip 파일 처리와 트리 구조 생성, Monaco Editor의 기본 구현을 성공적으로 해내면서, 복잡한 기능도 차근차근 구현해낼 수 있다는 자신감을 얻을 수 있었습니다. 하지만 이번 프로젝트를 통해 제가 아직 부족한 부분들도 많이 발견했습니다.

현재는 몇 가지 미완성된 부분이 있지만, 이번 프로젝트를 통해 배운 내용을 바탕으로 앞으로도 계속해서 개선해나겠습니다.
