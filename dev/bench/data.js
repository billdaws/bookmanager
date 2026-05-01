window.BENCHMARK_DATA = {
  "lastUpdate": 1777664449153,
  "repoUrl": "https://github.com/billdaws/bookmanager",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "f8fcb143be804d7345e2ffcec78aff67ef4dc070",
          "message": "ci(bench): track bench results over time",
          "timestamp": "2026-04-08T22:56:46-04:00",
          "tree_id": "26470aa30664214cdafe043cf72266f089145e9b",
          "url": "https://github.com/billdaws/bookmanager/commit/f8fcb143be804d7345e2ffcec78aff67ef4dc070"
        },
        "date": 1775703461383,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 225340,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 225340,
            "unit": "ns/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1655259,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1655259,
            "unit": "ns/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16811433,
            "unit": "ns/op\t 5900180 B/op\t   80036 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16811433,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900180,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3245641,
            "unit": "ns/op\t  142672 B/op\t    1261 allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3245641,
            "unit": "ns/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 142672,
            "unit": "B/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31522037,
            "unit": "ns/op\t  711862 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31522037,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711862,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 300451486,
            "unit": "ns/op\t 6840878 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 300451486,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840878,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10804041,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10804041,
            "unit": "ns/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.489,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.489,
            "unit": "ns/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1938010,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1938010,
            "unit": "ns/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1468180,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1468180,
            "unit": "ns/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 532034,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 532034,
            "unit": "ns/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1536308,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1536308,
            "unit": "ns/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5623976,
            "unit": "ns/op\t 5224357 B/op\t   31899 allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5623976,
            "unit": "ns/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224357,
            "unit": "B/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31899,
            "unit": "allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 47158287,
            "unit": "ns/op\t47387419 B/op\t  316308 allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 47158287,
            "unit": "ns/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387419,
            "unit": "B/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316308,
            "unit": "allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 407662098,
            "unit": "ns/op\t577848709 B/op\t 3160407 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 407662098,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848709,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160407,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264344101,
            "unit": "ns/op\t577839494 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264344101,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577839494,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "4f473b59a91d8495c2bd99158915f7b1971ae496",
          "message": "fix(e2e): use shared connection for in-memory db",
          "timestamp": "2026-04-08T23:01:04-04:00",
          "tree_id": "8924b42492155a74028d3049299064bcd86eeb5f",
          "url": "https://github.com/billdaws/bookmanager/commit/4f473b59a91d8495c2bd99158915f7b1971ae496"
        },
        "date": 1775703721217,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 232640,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 232640,
            "unit": "ns/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1995099,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1995099,
            "unit": "ns/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 21156282,
            "unit": "ns/op\t 5900168 B/op\t   80036 allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 21156282,
            "unit": "ns/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900168,
            "unit": "B/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2565162,
            "unit": "ns/op\t  136330 B/op\t    1261 allocs/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2565162,
            "unit": "ns/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 136330,
            "unit": "B/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 30395598,
            "unit": "ns/op\t  711861 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 30395598,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711861,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 289836470,
            "unit": "ns/op\t 6840918 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 289836470,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840918,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 12485497,
            "unit": "ns/op\t 5900194 B/op\t   80036 allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 12485497,
            "unit": "ns/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900194,
            "unit": "B/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.178,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.178,
            "unit": "ns/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1870073,
            "unit": "ns/op\t 1194934 B/op\t   30006 allocs/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1870073,
            "unit": "ns/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194934,
            "unit": "B/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1378057,
            "unit": "ns/op\t 1043056 B/op\t   20008 allocs/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1378057,
            "unit": "ns/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043056,
            "unit": "B/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 747321,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 747321,
            "unit": "ns/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1475428,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1475428,
            "unit": "ns/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5737781,
            "unit": "ns/op\t 5224220 B/op\t   31899 allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5737781,
            "unit": "ns/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224220,
            "unit": "B/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31899,
            "unit": "allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46453841,
            "unit": "ns/op\t47387840 B/op\t  316309 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46453841,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387840,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316309,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 441110126,
            "unit": "ns/op\t577848458 B/op\t 3160406 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 441110126,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848458,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160406,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 293338712,
            "unit": "ns/op\t577833630 B/op\t 3160394 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 293338712,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577833630,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160394,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "3a05e168b93e817005466a4263c27dd3f3c7d5ee",
          "message": "fix: don't gitignore the entrypoint lol",
          "timestamp": "2026-04-08T23:06:43-04:00",
          "tree_id": "51610096653845685b20ee692a9533697c3a8ced",
          "url": "https://github.com/billdaws/bookmanager/commit/3a05e168b93e817005466a4263c27dd3f3c7d5ee"
        },
        "date": 1775704058670,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 242069,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 242069,
            "unit": "ns/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "4221 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2098105,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2098105,
            "unit": "ns/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "596 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 20830803,
            "unit": "ns/op\t 5900177 B/op\t   80036 allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 20830803,
            "unit": "ns/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900177,
            "unit": "B/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2521389,
            "unit": "ns/op\t  133078 B/op\t    1261 allocs/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2521389,
            "unit": "ns/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 133078,
            "unit": "B/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "469 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 30222034,
            "unit": "ns/op\t  711868 B/op\t    5766 allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 30222034,
            "unit": "ns/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711868,
            "unit": "B/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 289374842,
            "unit": "ns/op\t 6841082 B/op\t   50999 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 289374842,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6841082,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50999,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 12465901,
            "unit": "ns/op\t 5900194 B/op\t   80036 allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 12465901,
            "unit": "ns/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900194,
            "unit": "B/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.168,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.168,
            "unit": "ns/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "552647294 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1985867,
            "unit": "ns/op\t 1194931 B/op\t   30006 allocs/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1985867,
            "unit": "ns/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194931,
            "unit": "B/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "573 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1423230,
            "unit": "ns/op\t 1043057 B/op\t   20008 allocs/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1423230,
            "unit": "ns/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043057,
            "unit": "B/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "847 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 640970,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 640970,
            "unit": "ns/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1743 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1542724,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1542724,
            "unit": "ns/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "766 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6022767,
            "unit": "ns/op\t 5224612 B/op\t   31902 allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6022767,
            "unit": "ns/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224612,
            "unit": "B/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31902,
            "unit": "allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 47008247,
            "unit": "ns/op\t47390613 B/op\t  316309 allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 47008247,
            "unit": "ns/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47390613,
            "unit": "B/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316309,
            "unit": "allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 441503345,
            "unit": "ns/op\t577847650 B/op\t 3160405 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 441503345,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577847650,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160405,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 294233196,
            "unit": "ns/op\t577829512 B/op\t 3160393 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 294233196,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577829512,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160393,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "177293c8c82eda4fdb4e51d07b3bf61bbe8eeef0",
          "message": "docs: init README",
          "timestamp": "2026-04-08T23:10:54-04:00",
          "tree_id": "db928792084b8a616ef3b3c9c45b5884957ca707",
          "url": "https://github.com/billdaws/bookmanager/commit/177293c8c82eda4fdb4e51d07b3bf61bbe8eeef0"
        },
        "date": 1775704307867,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 216474,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 216474,
            "unit": "ns/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5523 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1686751,
            "unit": "ns/op\t  412472 B/op\t    8028 allocs/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1686751,
            "unit": "ns/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412472,
            "unit": "B/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "714 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16666221,
            "unit": "ns/op\t 5900185 B/op\t   80036 allocs/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16666221,
            "unit": "ns/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900185,
            "unit": "B/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "61 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3144967,
            "unit": "ns/op\t  142052 B/op\t    1261 allocs/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3144967,
            "unit": "ns/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 142052,
            "unit": "B/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "375 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31263569,
            "unit": "ns/op\t  711889 B/op\t    5766 allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31263569,
            "unit": "ns/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711889,
            "unit": "B/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "38 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 300082964,
            "unit": "ns/op\t 6840866 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 300082964,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840866,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10757570,
            "unit": "ns/op\t 5900189 B/op\t   80036 allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10757570,
            "unit": "ns/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900189,
            "unit": "B/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.521,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.521,
            "unit": "ns/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "466099672 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 2011324,
            "unit": "ns/op\t 1194932 B/op\t   30006 allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2011324,
            "unit": "ns/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194932,
            "unit": "B/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1549450,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1549450,
            "unit": "ns/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "751 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 572107,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 572107,
            "unit": "ns/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2013 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1716326,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1716326,
            "unit": "ns/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "656 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5532115,
            "unit": "ns/op\t 5224570 B/op\t   31898 allocs/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5532115,
            "unit": "ns/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224570,
            "unit": "B/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31898,
            "unit": "allocs/op",
            "extra": "223 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 43784811,
            "unit": "ns/op\t47388966 B/op\t  316308 allocs/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 43784811,
            "unit": "ns/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47388966,
            "unit": "B/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316308,
            "unit": "allocs/op",
            "extra": "28 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 416073145,
            "unit": "ns/op\t577848946 B/op\t 3160407 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 416073145,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848946,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160407,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 252168518,
            "unit": "ns/op\t577834600 B/op\t 3160394 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 252168518,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577834600,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160394,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "49dfa15fe0dde6f7ae40c68ea236bd900585c335",
          "message": "fix(e2e): trying to fix flakey e2e tests",
          "timestamp": "2026-04-08T23:17:21-04:00",
          "tree_id": "42f9e76d1783008ddca7e69713aeb03184b4cd99",
          "url": "https://github.com/billdaws/bookmanager/commit/49dfa15fe0dde6f7ae40c68ea236bd900585c335"
        },
        "date": 1775704697281,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 213549,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 213549,
            "unit": "ns/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5612 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1638485,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1638485,
            "unit": "ns/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "717 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 17458263,
            "unit": "ns/op\t 5900188 B/op\t   80036 allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 17458263,
            "unit": "ns/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900188,
            "unit": "B/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3205175,
            "unit": "ns/op\t  143668 B/op\t    1261 allocs/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3205175,
            "unit": "ns/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 143668,
            "unit": "B/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "362 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31433847,
            "unit": "ns/op\t  711897 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31433847,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711897,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 299238524,
            "unit": "ns/op\t 6840918 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 299238524,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840918,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10377667,
            "unit": "ns/op\t 5900190 B/op\t   80036 allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10377667,
            "unit": "ns/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900190,
            "unit": "B/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.534,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.534,
            "unit": "ns/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "474703044 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1962722,
            "unit": "ns/op\t 1194932 B/op\t   30006 allocs/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1962722,
            "unit": "ns/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194932,
            "unit": "B/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "622 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1482738,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1482738,
            "unit": "ns/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "811 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 562188,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 562188,
            "unit": "ns/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1938 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1676627,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1676627,
            "unit": "ns/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "706 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5568347,
            "unit": "ns/op\t 5224813 B/op\t   31900 allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5568347,
            "unit": "ns/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224813,
            "unit": "B/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31900,
            "unit": "allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 45984940,
            "unit": "ns/op\t47389015 B/op\t  316309 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 45984940,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47389015,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316309,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 400011576,
            "unit": "ns/op\t577848682 B/op\t 3160409 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 400011576,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848682,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160409,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264551299,
            "unit": "ns/op\t577841571 B/op\t 3160389 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264551299,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577841571,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160389,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "78a247dcecdcbcbb91e97329c7b29263887b842f",
          "message": "ci: update runners to get rid of Node v20 warnings",
          "timestamp": "2026-04-08T23:21:41-04:00",
          "tree_id": "02b5e516889eb5b890ef77d22ff195b489b452d3",
          "url": "https://github.com/billdaws/bookmanager/commit/78a247dcecdcbcbb91e97329c7b29263887b842f"
        },
        "date": 1775704998166,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 221816,
            "unit": "ns/op\t   48024 B/op\t     825 allocs/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 221816,
            "unit": "ns/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48024,
            "unit": "B/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5421 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1629538,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1629538,
            "unit": "ns/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "718 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 15792534,
            "unit": "ns/op\t 5900193 B/op\t   80036 allocs/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 15792534,
            "unit": "ns/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900193,
            "unit": "B/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "79 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3238321,
            "unit": "ns/op\t  144319 B/op\t    1261 allocs/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3238321,
            "unit": "ns/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 144319,
            "unit": "B/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "357 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31239699,
            "unit": "ns/op\t  711867 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31239699,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711867,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 297129528,
            "unit": "ns/op\t 6840878 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 297129528,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840878,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10596234,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10596234,
            "unit": "ns/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "118 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.521,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.521,
            "unit": "ns/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "458774646 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1951578,
            "unit": "ns/op\t 1194931 B/op\t   30006 allocs/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1951578,
            "unit": "ns/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194931,
            "unit": "B/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "606 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1496666,
            "unit": "ns/op\t 1043057 B/op\t   20008 allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1496666,
            "unit": "ns/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043057,
            "unit": "B/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 610628,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 610628,
            "unit": "ns/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1929 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1654406,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1654406,
            "unit": "ns/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "716 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5604892,
            "unit": "ns/op\t 5225103 B/op\t   31901 allocs/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5604892,
            "unit": "ns/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5225103,
            "unit": "B/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31901,
            "unit": "allocs/op",
            "extra": "207 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46832630,
            "unit": "ns/op\t47386282 B/op\t  316306 allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46832630,
            "unit": "ns/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47386282,
            "unit": "B/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316306,
            "unit": "allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 404234494,
            "unit": "ns/op\t577847858 B/op\t 3160408 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 404234494,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577847858,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160408,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 268224025,
            "unit": "ns/op\t577840902 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 268224025,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577840902,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "5d4b39d601bbce4eb1950555fd39044ff0c2d655",
          "message": "docs(backlog): bug with author extraction",
          "timestamp": "2026-04-09T20:54:11-04:00",
          "tree_id": "9795b8754a6593b75f53d347fe2e2fb7b63a4e48",
          "url": "https://github.com/billdaws/bookmanager/commit/5d4b39d601bbce4eb1950555fd39044ff0c2d655"
        },
        "date": 1775782506113,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 211294,
            "unit": "ns/op\t   48024 B/op\t     825 allocs/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 211294,
            "unit": "ns/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48024,
            "unit": "B/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "6057 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1585567,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1585567,
            "unit": "ns/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "754 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16377139,
            "unit": "ns/op\t 5900175 B/op\t   80036 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16377139,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900175,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3081787,
            "unit": "ns/op\t  140557 B/op\t    1261 allocs/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3081787,
            "unit": "ns/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 140557,
            "unit": "B/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "388 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 33538635,
            "unit": "ns/op\t  711864 B/op\t    5766 allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 33538635,
            "unit": "ns/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711864,
            "unit": "B/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "34 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 319868483,
            "unit": "ns/op\t11036286 B/op\t   51007 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 319868483,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 11036286,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51007,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 9922014,
            "unit": "ns/op\t 5900193 B/op\t   80036 allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 9922014,
            "unit": "ns/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900193,
            "unit": "B/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "115 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.846,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.846,
            "unit": "ns/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "416719972 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1870967,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1870967,
            "unit": "ns/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "627 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1390079,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1390079,
            "unit": "ns/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "856 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 574832,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 574832,
            "unit": "ns/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2037 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1521741,
            "unit": "ns/op\t 1123065 B/op\t   20009 allocs/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1521741,
            "unit": "ns/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123065,
            "unit": "B/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "769 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5844542,
            "unit": "ns/op\t 5224927 B/op\t   31901 allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5844542,
            "unit": "ns/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224927,
            "unit": "B/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31901,
            "unit": "allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46510964,
            "unit": "ns/op\t47387125 B/op\t  316306 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46510964,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387125,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316306,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 411172843,
            "unit": "ns/op\t577847869 B/op\t 3160405 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 411172843,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577847869,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160405,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 261459482,
            "unit": "ns/op\t577846008 B/op\t 3160396 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 261459482,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577846008,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160396,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "4d409ca441121acd0ac32daa109e270f18da1b35",
          "message": "fix: bug with authors who have ; in their value, and some logging/error handling",
          "timestamp": "2026-04-30T12:09:57-04:00",
          "tree_id": "0f8107027345e718f887533f7f9302ab1b670608",
          "url": "https://github.com/billdaws/bookmanager/commit/4d409ca441121acd0ac32daa109e270f18da1b35"
        },
        "date": 1777565498056,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 230718,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 230718,
            "unit": "ns/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5071 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1668432,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1668432,
            "unit": "ns/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "711 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16628718,
            "unit": "ns/op\t 5900183 B/op\t   80036 allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16628718,
            "unit": "ns/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900183,
            "unit": "B/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "74 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3427549,
            "unit": "ns/op\t  148047 B/op\t    1363 allocs/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3427549,
            "unit": "ns/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 148047,
            "unit": "B/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1363,
            "unit": "allocs/op",
            "extra": "364 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31655663,
            "unit": "ns/op\t  716498 B/op\t    5868 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31655663,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 716498,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5868,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 299385349,
            "unit": "ns/op\t 6845562 B/op\t   51099 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 299385349,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6845562,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51099,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10075054,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10075054,
            "unit": "ns/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "117 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.493,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.493,
            "unit": "ns/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "481083578 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1918749,
            "unit": "ns/op\t 1194941 B/op\t   30006 allocs/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1918749,
            "unit": "ns/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194941,
            "unit": "B/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "615 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1469110,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1469110,
            "unit": "ns/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "784 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 592631,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 592631,
            "unit": "ns/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1857 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1485640,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1485640,
            "unit": "ns/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "747 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5775158,
            "unit": "ns/op\t 5224688 B/op\t   31901 allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5775158,
            "unit": "ns/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224688,
            "unit": "B/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31901,
            "unit": "allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 50640096,
            "unit": "ns/op\t47385618 B/op\t  316304 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 50640096,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47385618,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316304,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 424526703,
            "unit": "ns/op\t577848061 B/op\t 3160408 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 424526703,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848061,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160408,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264898064,
            "unit": "ns/op\t577834662 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264898064,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577834662,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "1c14f4a99359c2e55893215830e4127370114603",
          "message": "feat: email integration",
          "timestamp": "2026-04-30T19:50:31-04:00",
          "tree_id": "12fb76898f47f76c8af0a8f2822703b54a088608",
          "url": "https://github.com/billdaws/bookmanager/commit/1c14f4a99359c2e55893215830e4127370114603"
        },
        "date": 1777593837285,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 249825,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 249825,
            "unit": "ns/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "4113 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2038580,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2038580,
            "unit": "ns/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "578 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 20463020,
            "unit": "ns/op\t 5900178 B/op\t   80036 allocs/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 20463020,
            "unit": "ns/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900178,
            "unit": "B/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "58 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3038937,
            "unit": "ns/op\t  153396 B/op\t    1619 allocs/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3038937,
            "unit": "ns/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 153396,
            "unit": "B/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1619,
            "unit": "allocs/op",
            "extra": "403 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31301632,
            "unit": "ns/op\t  726325 B/op\t    6124 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31301632,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 726325,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6124,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 295874550,
            "unit": "ns/op\t 6855362 B/op\t   51355 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 295874550,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6855362,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51355,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 12525076,
            "unit": "ns/op\t 5900195 B/op\t   80036 allocs/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 12525076,
            "unit": "ns/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900195,
            "unit": "B/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "94 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.17,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.17,
            "unit": "ns/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "552183718 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1960585,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1960585,
            "unit": "ns/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "603 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1335122,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1335122,
            "unit": "ns/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "895 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 638152,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 638152,
            "unit": "ns/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1729 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1448143,
            "unit": "ns/op\t 1123065 B/op\t   20009 allocs/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1448143,
            "unit": "ns/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123065,
            "unit": "B/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "825 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6389086,
            "unit": "ns/op\t 5539922 B/op\t   33702 allocs/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6389086,
            "unit": "ns/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5539922,
            "unit": "B/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 33702,
            "unit": "allocs/op",
            "extra": "195 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 51821774,
            "unit": "ns/op\t67313388 B/op\t  334300 allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 51821774,
            "unit": "ns/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 67313388,
            "unit": "B/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 334300,
            "unit": "allocs/op",
            "extra": "22 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 466796808,
            "unit": "ns/op\t609370890 B/op\t 3340410 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 466796808,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 609370890,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3340410,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 313182620,
            "unit": "ns/op\t609352138 B/op\t 3340389 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 313182620,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 609352138,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3340389,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "02903f44488d03501eea9d0ec4f6bf6b99fa9703",
          "message": "feat: cover handling and gallery view",
          "timestamp": "2026-05-01T14:58:36-04:00",
          "tree_id": "f22ed53893fffcee284d529ba50eeeda941a9b80",
          "url": "https://github.com/billdaws/bookmanager/commit/02903f44488d03501eea9d0ec4f6bf6b99fa9703"
        },
        "date": 1777662020816,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 228462,
            "unit": "ns/op\t   57536 B/op\t     826 allocs/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 228462,
            "unit": "ns/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57536,
            "unit": "B/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5126 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1810659,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1810659,
            "unit": "ns/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "666 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19509198,
            "unit": "ns/op\t 6748022 B/op\t   80037 allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19509198,
            "unit": "ns/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748022,
            "unit": "B/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "70 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4454333,
            "unit": "ns/op\t  186273 B/op\t    1704 allocs/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4454333,
            "unit": "ns/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 186273,
            "unit": "B/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "267 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 36336153,
            "unit": "ns/op\t  811062 B/op\t    6209 allocs/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 36336153,
            "unit": "ns/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811062,
            "unit": "B/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "32 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 337673004,
            "unit": "ns/op\t 7677216 B/op\t   51439 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 337673004,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677216,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51439,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11979183,
            "unit": "ns/op\t 6748041 B/op\t   80037 allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11979183,
            "unit": "ns/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748041,
            "unit": "B/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.824,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.824,
            "unit": "ns/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "424812160 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1927503,
            "unit": "ns/op\t 1358781 B/op\t   30006 allocs/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1927503,
            "unit": "ns/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358781,
            "unit": "B/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "607 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1434145,
            "unit": "ns/op\t 1206890 B/op\t   20008 allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1434145,
            "unit": "ns/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206890,
            "unit": "B/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "806 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 609733,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 609733,
            "unit": "ns/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1773 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1552768,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1552768,
            "unit": "ns/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "763 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 6288215,
            "unit": "ns/op\t 5310129 B/op\t   29675 allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 6288215,
            "unit": "ns/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5310129,
            "unit": "B/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29675,
            "unit": "allocs/op",
            "extra": "202 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 45618330,
            "unit": "ns/op\t64984655 B/op\t  294270 allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 45618330,
            "unit": "ns/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64984655,
            "unit": "B/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294270,
            "unit": "allocs/op",
            "extra": "25 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 416055008,
            "unit": "ns/op\t586338768 B/op\t 2940367 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 416055008,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586338768,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940367,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 276053367,
            "unit": "ns/op\t586333044 B/op\t 2940359 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 276053367,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586333044,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940359,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "0df71547694a7341e3a839bec135317f5a22e193",
          "message": "perf: parallelize metadata extraction",
          "timestamp": "2026-05-01T15:39:15-04:00",
          "tree_id": "f068e2ef1772bed33d12a05f5cee411ee2705e85",
          "url": "https://github.com/billdaws/bookmanager/commit/0df71547694a7341e3a839bec135317f5a22e193"
        },
        "date": 1777664448563,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 215372,
            "unit": "ns/op\t   57536 B/op\t     826 allocs/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 215372,
            "unit": "ns/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 57536,
            "unit": "B/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 826,
            "unit": "allocs/op",
            "extra": "5602 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1803890,
            "unit": "ns/op\t  485537 B/op\t    8029 allocs/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1803890,
            "unit": "ns/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 485537,
            "unit": "B/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8029,
            "unit": "allocs/op",
            "extra": "657 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 19310297,
            "unit": "ns/op\t 6748034 B/op\t   80037 allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 19310297,
            "unit": "ns/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748034,
            "unit": "B/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "72 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 4228966,
            "unit": "ns/op\t  182726 B/op\t    1704 allocs/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 4228966,
            "unit": "ns/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 182726,
            "unit": "B/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1704,
            "unit": "allocs/op",
            "extra": "283 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 35681834,
            "unit": "ns/op\t  811056 B/op\t    6209 allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 35681834,
            "unit": "ns/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 811056,
            "unit": "B/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 6209,
            "unit": "allocs/op",
            "extra": "33 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 332529359,
            "unit": "ns/op\t 7677390 B/op\t   51440 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 332529359,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 7677390,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 51440,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 11143127,
            "unit": "ns/op\t 6748041 B/op\t   80037 allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 11143127,
            "unit": "ns/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6748041,
            "unit": "B/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80037,
            "unit": "allocs/op",
            "extra": "108 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.82,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.82,
            "unit": "ns/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "425722639 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1836324,
            "unit": "ns/op\t 1358779 B/op\t   30006 allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1836324,
            "unit": "ns/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1358779,
            "unit": "B/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "649 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1387706,
            "unit": "ns/op\t 1206896 B/op\t   20008 allocs/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1387706,
            "unit": "ns/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1206896,
            "unit": "B/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "862 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 586598,
            "unit": "ns/op\t  966904 B/op\t       9 allocs/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 586598,
            "unit": "ns/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 966904,
            "unit": "B/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1928 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1767730,
            "unit": "ns/op\t 1286904 B/op\t   20009 allocs/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1767730,
            "unit": "ns/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1286904,
            "unit": "B/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "663 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5937107,
            "unit": "ns/op\t 5307946 B/op\t   29676 allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5937107,
            "unit": "ns/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5307946,
            "unit": "B/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 29676,
            "unit": "allocs/op",
            "extra": "196 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 45712961,
            "unit": "ns/op\t64960900 B/op\t  294271 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 45712961,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 64960900,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 294271,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 425728442,
            "unit": "ns/op\t586098893 B/op\t 2940371 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 425728442,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586098893,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940371,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 250845614,
            "unit": "ns/op\t586097782 B/op\t 2940367 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 250845614,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 586097782,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 2940367,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      }
    ]
  }
}