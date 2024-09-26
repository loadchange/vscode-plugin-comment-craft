export type CommentPrefix = {
  prefix: string;
  description: {
    en: string;
    zh: string;
    ja: string;
    ko: string;
    zhHant: string;
    de: string;
  };
  color: string;
};

export const COMMENT_PREFIXES: CommentPrefix[] = [
  {
    prefix: "TODO",
    description: {
      en: "Something to be done",
      zh: "待办事项",
      ja: "やるべきこと",
      ko: "해야 할 일",
      zhHant: "待辦事項",
      de: "Zu erledigen",
    },
    color: "#FFA500", // 橙色
  },
  {
    prefix: "FIXME",
    description: {
      en: "Should be corrected",
      zh: "需要修复",
      ja: "修正が必要",
      ko: "수정 필요",
      zhHant: "需要修復",
      de: "Muss korrigiert werden",
    },
    color: "#FF4500", // 红橙色
  },
  {
    prefix: "NOTE",
    description: {
      en: "Important information",
      zh: "重要信息",
      ja: "重要な情報",
      ko: "중요 정보",
      zhHant: "重要資訊",
      de: "Wichtige Information",
    },
    color: "#1E90FF", // 道奇蓝
  },
  {
    prefix: "HACK",
    description: {
      en: "Workaround or suboptimal code",
      zh: "临时解决方案或次优代码",
      ja: "回避策または最適でないコード",
      ko: "임시 해결책 또는 차선책 코드",
      zhHant: "臨時解決方案或次優代碼",
      de: "Behelfslösung oder suboptimaler Code",
    },
    color: "#FF69B4", // 热粉红
  },
  {
    prefix: "BUG",
    description: {
      en: "Known bug that should be fixed",
      zh: "已知bug，需要修复",
      ja: "修正すべき既知のバグ",
      ko: "수정해야 할 알려진 버그",
      zhHant: "已知bug，需要修復",
      de: "Bekannter Fehler, der behoben werden sollte",
    },
    color: "#DC143C", // 猩红
  },
  {
    prefix: "OPTIMIZE",
    description: {
      en: "Needs performance improvement",
      zh: "需要性能优化",
      ja: "パフォーマンスの改善が必要",
      ko: "성능 개선 필요",
      zhHant: "需要效能優化",
      de: "Benötigt Leistungsverbesserung",
    },
    color: "#32CD32", // 酸橙绿
  },
  {
    prefix: "REVIEW",
    description: {
      en: "Needs to be reviewed",
      zh: "需要审查",
      ja: "レビューが必要",
      ko: "검토 필요",
      zhHant: "需要審查",
      de: "Muss überprüft werden",
    },
    color: "#9370DB", // 中紫色
  },
  {
    prefix: "XXX",
    description: {
      en: "Warning about problematic code",
      zh: "有问题的代码警告",
      ja: "問題のあるコードについての警告",
      ko: "문제가 있는 코드에 대한 경고",
      zhHant: "有問題的程式碼警告",
      de: "Warnung vor problematischem Code",
    },
    color: "#FF0000", // 红色
  },
  {
    prefix: "IDEA",
    description: {
      en: "Possible improvement",
      zh: "可能的改进",
      ja: "改善の可能性",
      ko: "개선 가능성",
      zhHant: "可能的改進",
      de: "Mögliche Verbesserung",
    },
    color: "#7FFF00", // 查特酸橙绿
  },
  {
    prefix: "QUESTION",
    description: {
      en: "Further investigation needed",
      zh: "需要进一步调查",
      ja: "さらなる調査が必要",
      ko: "추가 조사 필요",
      zhHant: "需要進一步調查",
      de: "Weitere Untersuchung erforderlich",
    },
    color: "#FFD700", // 金色
  },
  {
    prefix: "DEPRECATED",
    description: {
      en: "Outdated code",
      zh: "过时的代码",
      ja: "非推奨のコード",
      ko: "더 이상 사용되지 않는 코드",
      zhHant: "過時的程式碼",
      de: "Veralteter Code",
    },
    color: "#A9A9A9", // 暗灰色
  },
  {
    prefix: "REFACTOR",
    description: {
      en: "Needs to be refactored",
      zh: "需要重构",
      ja: "リファクタリングが必要",
      ko: "리팩토링 필요",
      zhHant: "需要重構",
      de: "Muss umstrukturiert werden",
    },
    color: "#8A2BE2", // 紫罗兰色
  },
  {
    prefix: "FUTURE",
    description: {
      en: "Future enhancement",
      zh: "未来的增强",
      ja: "将来の機能強化",
      ko: "향후 개선사항",
      zhHant: "未來的增強",
      de: "Zukünftige Verbesserung",
    },
    color: "#00CED1", // 暗青色
  },
  {
    prefix: "TEMP",
    description: {
      en: "Temporary solution",
      zh: "临时解决方案",
      ja: "一時的な解決策",
      ko: "임시 해결책",
      zhHant: "臨時解決方案",
      de: "Vorübergehende Lösung",
    },
    color: "#FF6347", // 番茄色
  },
  {
    prefix: "DEBUG",
    description: {
      en: "For debugging purposes",
      zh: "用于调试目的",
      ja: "デバッグ目的",
      ko: "디버깅 목적",
      zhHant: "用於除錯目的",
      de: "Für Debugging-Zwecke",
    },
    color: "#00FF00", // 酸橙色
  },
];
