// BetaBadge Updater - Figma Plugin
// 베타 뱃지 컴포넌트를 찾아서 개선된 스타일로 업데이트

figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'update-badge') {
    const results = [];

    // 현재 페이지에서 "Badge" 또는 "베타" 텍스트를 가진 노드 탐색
    function findBadgeNodes(node) {
      if (node.name === 'Badge' || node.name === '베타') {
        results.push(node);
      }
      if ('children' in node) {
        for (const child of node.children) {
          findBadgeNodes(child);
        }
      }
    }

    findBadgeNodes(figma.currentPage);

    let updated = 0;

    for (const node of results) {
      if (node.type === 'INSTANCE' || node.type === 'FRAME' || node.type === 'COMPONENT') {
        // 패딩 개선: 좌우 8px, 상하 2px
        if ('paddingLeft' in node) {
          node.paddingLeft = 8;
          node.paddingRight = 8;
          node.paddingTop = 2;
          node.paddingBottom = 2;
        }

        // cornerRadius 유지 (6px)
        if ('cornerRadius' in node) {
          node.cornerRadius = 6;
        }

        // 배경색 개선: 소프트 그린 12% 불투명도
        if ('fills' in node) {
          node.fills = [
            {
              type: 'SOLID',
              color: { r: 0.431, g: 0.906, b: 0.325 },
              opacity: 0.12,
              blendMode: 'NORMAL',
            },
          ];
        }

        // 테두리 개선: 그린 35% 불투명도
        if ('strokes' in node) {
          node.strokes = [
            {
              type: 'SOLID',
              color: { r: 0.431, g: 0.906, b: 0.325 },
              opacity: 0.35,
              blendMode: 'NORMAL',
            },
          ];
          node.strokeWeight = 1;
          node.strokeAlign = 'INSIDE';
        }

        updated++;
      }

      // 텍스트 자식 스타일 개선
      if ('children' in node) {
        for (const child of node.children) {
          if (child.type === 'TEXT') {
            await figma.loadFontAsync(child.fontName);
            child.fontSize = 11;
            child.letterSpacing = { value: 0.3, unit: 'PIXELS' };
            child.fills = [
              {
                type: 'SOLID',
                color: { r: 0.239, g: 0.620, b: 0.122 },
                opacity: 1,
              },
            ];
          }
        }
      }
    }

    figma.ui.postMessage({
      type: 'done',
      count: updated,
    });

    if (updated === 0) {
      figma.notify('베타 뱃지를 찾을 수 없습니다. 해당 노드를 선택 후 실행하세요.');
    } else {
      figma.notify(`✅ ${updated}개 베타 뱃지 업데이트 완료`);
    }
  }

  if (msg.type === 'update-selected') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.notify('노드를 먼저 선택하세요.');
      return;
    }

    for (const node of selection) {
      if ('paddingLeft' in node) {
        node.paddingLeft = 8;
        node.paddingRight = 8;
        node.paddingTop = 2;
        node.paddingBottom = 2;
      }
      if ('cornerRadius' in node) node.cornerRadius = 6;
      if ('fills' in node) {
        node.fills = [{
          type: 'SOLID',
          color: { r: 0.431, g: 0.906, b: 0.325 },
          opacity: 0.12,
          blendMode: 'NORMAL',
        }];
      }
      if ('strokes' in node) {
        node.strokes = [{
          type: 'SOLID',
          color: { r: 0.431, g: 0.906, b: 0.325 },
          opacity: 0.35,
          blendMode: 'NORMAL',
        }];
        node.strokeWeight = 1;
        node.strokeAlign = 'INSIDE';
      }

      if ('children' in node) {
        for (const child of node.children) {
          if (child.type === 'TEXT') {
            await figma.loadFontAsync(child.fontName);
            child.fontSize = 11;
            child.fills = [{
              type: 'SOLID',
              color: { r: 0.239, g: 0.620, b: 0.122 },
              opacity: 1,
            }];
          }
        }
      }
    }

    figma.notify('✅ 선택한 뱃지 업데이트 완료');
    figma.ui.postMessage({ type: 'done', count: selection.length });
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
