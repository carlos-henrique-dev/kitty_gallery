import { memo, ReactNode } from 'react';

type TabItem = {
  index: number;
  title: string;
  icon?: ReactNode;
};

type TabProps = {
  tabs: TabItem[] | [];
  changeTab: (index: number) => void;
  currentTab: number;
};

const Tabs = memo(({ tabs, changeTab, currentTab }: TabProps) => {
  const handleTabClick = (tabIndex: number) => changeTab(tabIndex);

  const renderTabs = () => {
    return tabs.map((tab: TabItem) => {
      const { index, title, icon: Icon = null } = tab;

      return (
        <div
          key={index}
          className={`tab ${currentTab === index ? 'active' : ''}`}
          onClick={() => handleTabClick(index)}
          data-testid={`tab-${index}`}
          onKeyPress={() => handleTabClick(index)}
          role="none"
        >
          <span className="icon">{Icon}</span>
          <span className="title">{title}</span>
        </div>
      );
    });
  };

  return (
    <div className="tabs" id="tabs">
      {renderTabs()}
    </div>
  );
});

export default Tabs;
